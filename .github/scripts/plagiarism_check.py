#!/opt/homebrew/bin/python3
from os import walk
import jsbeautifier
from multiprocessing import Pool
import nltk
from functools import cmp_to_key
import argparse
import re
import random


def load_files_from_dir(dir, suffix):
	all_game_paths = []
	for (dirpath, dirnames, filenames) in walk(dir):
		for filepath in filenames:
			full_file_path = dirpath + "/" + filepath
			if full_file_path.endswith(suffix):
				all_game_paths.append(full_file_path)
	return all_game_paths


def load_data(path):
	dd = "".join(open(path, "r+").readlines())
	dlen = len(dd)
	if dd is None or dlen == 0:
		dd = ""

	return preprocess(dd)


def format_code(code):
	options = jsbeautifier.default_options()
	options.wrap_line_length = 80
	beautified_code = jsbeautifier.beautify(code, options)
	return beautified_code


def remove_whitespace(code):
	code = "".join([s for s in code.splitlines(True) if s.strip("\r\n")])
	return code


def filter_code(code):
	code = re.sub('bitmap`.*?`', '', code, flags=re.MULTILINE | re.DOTALL)
	code = re.sub('tune`.*?`', '', code, flags=re.MULTILINE | re.DOTALL)
	code = re.sub('map`.*?`', '', code, flags=re.MULTILINE | re.DOTALL)
	code = re.sub('^/\\*(.|[\r\n])*?\\*/', '', code, flags=re.DOTALL)
	code = re.sub('(//)(.+?)(?=[\n\r]|\\*\\))', '', code, flags=re.MULTILINE | re.DOTALL)
	return code


def preprocess(code):
	return format_code(remove_whitespace(filter_code(code)))


def text_length_score(text1, text2):
	return 1 - abs(len(text1) - len(text2)) / (len(text1) + len(text2))


def tokenize(text, num_tokens):
	return set(nltk.ngrams(text.lower().split(" "), num_tokens))


def symmetrical_diff_score(text1, text2, num_tokens):
	set1 = tokenize(text1, num_tokens)
	set2 = tokenize(text2, num_tokens)
	symmetrical_difference = set1.symmetric_difference(set2)
	return 1.0 - (len(symmetrical_difference) / (len(set1) + len(set2)))


def compare(document, other_document):
	len_score = text_length_score(document, other_document)

	return len_score * 0.1 + \
		symmetrical_diff_score(document, other_document, 1) * 0.2 + \
		symmetrical_diff_score(document, other_document, 2) * 0.3 + \
		symmetrical_diff_score(document, other_document, 3) * 0.4


class DocumentComparison:
	def __init__(self, path, score):
		self.path = path
		self.score = score


def create_doc_comparison(item):
	return DocumentComparison(item[2], compare(item[0], item[1]))


def find_matching_docs(input_doc_path, all_games, threshold, log):
	all_game_paths = all_games[:]
	all_game_paths.remove(input_doc_path)
	input_document = load_data(input_doc_path)

	with Pool() as P:
		if log:
			print("Comparing submission against %d gallery entries..." % len(all_game_paths))

		# Create an array of multiple copies of the input document.  This is required for parallelization.
		input_docs = [input_document for i in range(len(all_game_paths))]

		# Zip input document array along w/ game paths and game data
		all_data = zip(input_docs, P.map(load_data, all_game_paths), all_game_paths)

		# Rank documents		
		results = sorted(P.map(create_doc_comparison, all_data), key=cmp_to_key(lambda i1, i2: i2.score - i1.score))

		if log:
			print("Done!")
		documents_exceeding_threshold = list(filter(lambda item: item.score > threshold, results))
		top_matches = documents_exceeding_threshold[:5]
		if log:
			if len(documents_exceeding_threshold) > 0:
				print("%d gallery entries match the submission too closely." % len(documents_exceeding_threshold))
			else:
				print("No similar documents found.")
			if len(top_matches) > 0:
				print("Here are the top %d matches" % len(top_matches))
			for document in top_matches:
				print("%f - %s" % (document.score, document.path))

		return len(documents_exceeding_threshold)


def check_all_games():
	global all_gallery_items
	num_samples = 800
	all_gallery_items = load_files_from_dir(args.doc_dir, ".js")
	random.shuffle(all_gallery_items)
	all_good_games = []
	for gallery_item in all_gallery_items[:num_samples]:
		print("Processing %s" % gallery_item)
		if find_matching_docs(gallery_item, all_gallery_items, 0.5, False) == 0:
			all_good_games.append(gallery_item)
	print("Number of good games: %d" % len(all_good_games))
	print("Percentage of good games: %d%%" % int(float(len(all_good_games)) / float(num_samples) * 100.0))
	exit(1)


if __name__ == '__main__':
	# run_tests()
	# check_all_games()

	parser = argparse.ArgumentParser(
		description='Compare an input javascript file w/ the contents of a directory, and returns similarity scores')
	parser.add_argument('doc_dir', type=str, help='a path to a directory of documents')
	parser.add_argument('threshold', type=float,
						help='similarity threshold (above which duplicate warnings will be returned)')
	parser.add_argument('input_doc', type=str, help='a path to an input document')
	args = parser.parse_args()

	all_gallery_items = load_files_from_dir(args.doc_dir, ".js")

	if args.input_doc not in all_gallery_items:
		print("Sorry - the input document must be a reference into the gallery directory.")
		exit(1)
	num_bad_docs = find_matching_docs(args.input_doc, all_gallery_items, args.threshold, True)
	exit(0 if num_bad_docs == 0 else 1)
