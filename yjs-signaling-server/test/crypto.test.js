import { describe, it, expect } from 'vitest'
import * as cryptutils from '../src/crypto'
import * as prng from 'lib0/prng'

describe('crypto utils', () => {
  it('should correctly encrypt and decrypt data', async () => {
    // Create a deterministic PRNG for testing
    const seed = Math.floor(Math.random() * 1000000)
    const testPrng = prng.create(seed)
    
    const secret = prng.word(testPrng)
    const roomName = prng.word(testPrng)
    const data = prng.uint8Array(testPrng, 100)

    // Generate key
    console.time('Key generation')
    const key = await cryptutils.deriveKey(secret, roomName)
    console.timeEnd('Key generation')

    // Encrypt
    console.time('Encryption')
    const encrypted = await cryptutils.encrypt(data, key)
    console.timeEnd('Encryption')
    
    console.log(`Byte length: ${data.byteLength}b`)
    console.log(`Encrypted length: ${encrypted.length}b`)

    // Decrypt
    console.time('Decryption')
    const decrypted = await cryptutils.decrypt(encrypted, key)
    console.timeEnd('Decryption')

    // Assert the decrypted data matches the original
    expect(decrypted).toEqual(data)
  })
})
