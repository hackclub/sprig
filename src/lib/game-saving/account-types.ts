/**
 * Shared types and pure utilities used by both server and client code.
 * This file must NOT import any server-only modules (firebase-admin, etc.)
 * to avoid breaking client-side hydration.
 */

export const isValidEmail = (email: string): boolean => /^\S+@\S+\.\S+$/.test(email)

export interface User {
	id: string
	createdAt: any
	email: string
	username: string | null
	failedLoginAttempts?: number
	lockoutUntil?: any
}

export interface Session {
	id: string
	createdAt: any
	userId: string
	full: boolean
}

export interface Game {
	id: string
	ownerId: string
	createdAt: any
	modifiedAt: any
	unprotected: boolean
	name: string
	code: string
	tutorialName?: string
	tutorialIndex?: number
	isSavedOnBackend?: boolean
	roomParticipants?: RoomParticipant[]
	isRoomOpen?: boolean
	password?: string
	isPublished?: boolean
	githubPR?: string
}

export interface LoginCode {
	id: string
	createdAt: any
	userId: string
}

export interface Snapshot {
	id: string
	createdAt: any
	gameId: string
	ownerId: string
	name: string
	ownerName: string
	code: string
}

export interface SnapshotData {
	id: string
	createdAt: any
	name: string
	ownerName: string
	code: string
}

export interface SessionInfo {
	session: Session
	user: User
}

export type RoomParticipant = {
	userEmail: string
	isHost: boolean
	isBanned?: boolean
}
