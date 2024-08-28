/*
@title: keyboard for sprig
@author: mrdarip
@tags: ['tool']
@addedOn: 2024-08-15

Select the line where the character you want to write is, 
if you have written your word completelly and your word haven't
been written yet just start from the first character.

press on an empty character ten times to see what you have written.
*/

//const words = ("write here the words you would like to write and comment next line but discomment this too").toLowerCase().split(" ")
const words = ("the of to and a in is it you that he was for on are with as I his they be at one have this from or had by not word but what some we can out other were all there when up use your how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any new work part take get place made live where after back little only round man year came show every good me give our under name very through just form sentence great think say help low line differ turn cause much mean before move right boy old too same tell does set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run don't while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct pose leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen six table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map rain rule govern pull cold notice voice unit power town fine certain fly fall lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop ocean warm free minute strong special mind behind clear tail produce fact street inch multiply nothing course stay wheel full force blue object decide surface deep moon island foot system busy test record boat common gold possible plane stead dry wonder laugh thousand ago ran check game shape equate hot miss brought heat snow tire bring yes distant fill east paint language among grand ball yet wave drop heart am present heavy dance engine position arm wide sail material size vary settle speak weight general ice matter circle pair include divide syllable felt perhaps pick sudden count square reason length represent art subject region energy hunt probable bed brother egg ride cell believe fraction forest sit race window store summer train sleep prove lone leg exercise wall catch mount wish sky board joy winter sat written wild instrument kept glass grass cow job edge sign visit past soft fun bright gas weather month million bear finish happy hope flower clothe strange gone jump baby eight village meet root buy raise solve metal whether push seven paragraph third shall held hair describe cook floor either result burn hill safe cat century consider type law bit coast copy phrase silent tall sand soil roll temperature finger industry value fight lie beat excite natural view sense ear else quite broke case middle kill son lake moment scale loud spring observe child straight consonant nation dictionary milk speed method organ pay age section dress cloud surprise quiet stone tiny climb cool design poor lot experiment bottom key iron single stick flat twenty skin smile crease hole trade melody trip office receive row mouth exact symbol die least trouble shout except wrote seed tone join suggest clean break lady yard rise bad blow oil blood touch grew cent mix team wire cost lost brown wear garden equal sent choose fell fit flow fair bank collect save control decimal gentle woman captain practice separate difficult doctor please protect noon whose locate ring character insect caught period indicate radio spoke atom human history effect electric expect crop modern element hit student corner party supply bone rail imagine provide agree thus capital won't chair danger fruit rich thick soldier process operate guess necessary sharp wing create neighbor wash bat rather crowd corn compare poem string bell depend meat rub tube famous dollar stream fear sight thin triangle planet hurry chief colony clock mine tie enter major fresh search send yellow gun allow print dead spot desert suit current lift rose continue block chart hat sell success company subtract event particular deal swim term opposite wife shoe shoulder spread arrange camp invent cotton born determine quart nine truck noise level chance gather shop stretch throw shine property column molecule select wrong gray repeat require broad prepare salt nose plural anger claim continent oxygen sugar death pretty skill women season solution magnet silver thank branch match suffix especially fig afraid huge sister steel discuss forward similar guide experience score apple bought led pitch coat mass card band rope slip win dream evening condition feed tool total basic smell valley nor double seat arrive master track parent shore division sheet substance favor connect post spend chord fat glad original share station dad bread charge proper bar offer segment slave duck instant market degree populate chick dear enemy reply drink occur support speech nature range steam motion path liquid log meant quotient teeth shell neck").split(" ")
const keys = ("wdsailkj").split("")

var emptyKeysPressed = 0
var readingLine = 0

var writtenTextTokens = []
var possibleWords = words
var currentCharIndex = 0
var charsOnButtons = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]

calcKeyboard()

function calcKeyboard() {
  charsOnButtons = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]
  let buttonsWeight = [0, 0, 0, 0, 0, 0, 0, 0]

  let charsCount = {}

  for (let word of possibleWords) { //we count the sum of characters at current index
    letterAtCurrentIndex = word.charAt(currentCharIndex % word.length)

    charsCount[letterAtCurrentIndex] = charsCount[letterAtCurrentIndex] ? charsCount[letterAtCurrentIndex] + 1 : 1
  }

  let sortedCharsCount = Object.fromEntries(
    Object.entries(charsCount).sort(([, a], [, b]) => b - a)
  );

  for (const [key, value] of Object.entries(sortedCharsCount)) {
    let minWeight = Math.min(...buttonsWeight)
    let minWeightIndex = buttonsWeight.indexOf(minWeight)

    buttonsWeight[minWeightIndex] += value
    charsOnButtons[minWeightIndex].push(key)
  }

  updateUI()
}

function updateUI() {
  clearText()
  displayKeyboard()
  displayText()
}

function displayText() {
  let allText = writtenTextTokens.join(" ")
  addText(allText.substring(allText.length - width() * 2), {
    x: 0,
    y: 0,
    color: '0'
  })
}

function displayKeyboard() {
  let keyPositions = [
    [3, 8],
    [6, 9],
    [3, 11],
    [0, 10],
    [13, 12],
    [16, 13],
    [13, 15],
    [10, 14]
  ]

  for (let i = 0; i < charsOnButtons.length; i++) {
    addText(charsOnButtons[i].join(""), {
      x: keyPositions[i][0],
      y: keyPositions[i][1],
      color: i >= 4 ? '5' : '3'
    })
  }
}

let level = 0
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`
]

setMap(levels[level])

const powerOn = tune`
225,
37.5: F5-37.5,
37.5: A5-37.5,
37.5: F5-37.5,
37.5: A5-37.5,
825`
const ok = tune`
100: F5-100,
100: A5-100,
3000`
const superOk = tune`
100: F5-100,
100: G5-100,
100: B5-100,
2900`
const wrong = tune`
100: E4-100,
100: C4-100,
3000`
const superWrong = tune`
100: E4-100,
100: C4-100,
100: D4-100,
100,
100: C4-100,
2700`

playTune(powerOn)


for (let key of keys) {
  onInput(key, () => {
    if (level == 0) {
      if (charsOnButtons[keys.indexOf(key)].length < 1) {

        emptyKeysPressed++

        if (emptyKeysPressed >= 10) {
          playTune(superWrong)
          clearText()
          level = 1

          setReadingInput()
        } else {
          playTune(wrong)
        }
      } else {
        emptyKeysPressed = 0

        possibleWords = possibleWords.filter(word => charsOnButtons[keys.indexOf(key)].includes(word.charAt(currentCharIndex % word.length)))

        if (possibleWords.length <= 1) {
          playTune(superOk)
          writtenTextTokens.push(possibleWords[0])
          possibleWords = words
          currentCharIndex = 0
        } else {
          playTune(ok)
          currentCharIndex++
        }

        calcKeyboard()
      }
    }
  })
}

function setReadingInput() {
  updateReadingUI()

  onInput('w', () => {
    readingLine--
    updateReadingUI()
  })
  onInput('s', () => {
    readingLine++
    updateReadingUI()
  })
}

function updateReadingUI() {
  clearText()
  let allText = writtenTextTokens.join(" ")

  for (let i = 0; i < height() * 2; i++) {
    addText(allText.substring((i + readingLine) * (width() * 2), (i + readingLine + 1) * width() * 2), {
      x: 0,
      y: i,
      color: '0'
    })
  }
}

