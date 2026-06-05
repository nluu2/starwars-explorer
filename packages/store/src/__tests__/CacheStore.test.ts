import { CacheStore } from '../CacheStore'

describe('CacheStore', () => {
  let cache: CacheStore

  beforeEach(() => {
    cache = new CacheStore()
  })

  describe('set and get', () => {
    it('stores and retrieves a value', () => {
      cache.set('key', { name: 'Luke' }, 60000)
      expect(cache.get('key')).toEqual({ name: 'Luke' })
    })

    it('returns null for missing key', () => {
      expect(cache.get('missing')).toBeNull()
    })

    it('stores different types correctly', () => {
      cache.set('string', 'value', 60000)
      cache.set('number', 42, 60000)
      cache.set('array', [1, 2, 3], 60000)
      expect(cache.get('string')).toBe('value')
      expect(cache.get('number')).toBe(42)
      expect(cache.get('array')).toEqual([1, 2, 3])
    })
  })

  describe('getStatus', () => {
    it('returns fresh for a newly set entry', () => {
      cache.set('people:key', { name: 'Luke' }, CacheStore.TTL.people)
      expect(cache.getStatus('people:key')).toBe('fresh')
    })

    it('returns missing for unknown key', () => {
      expect(cache.getStatus('unknown')).toBe('missing')
    })

    it('returns stale for expired entry', () => {
      cache.set('people:key', { name: 'Luke' }, -1)
      expect(cache.getStatus('people:key')).toBe('stale')
    })
  })

  describe('isStale', () => {
    it('returns false for fresh entry', () => {
      cache.set('people:key', { name: 'Luke' }, CacheStore.TTL.people)
      expect(cache.isStale('people:key')).toBe(false)
    })

    it('returns true for missing entry', () => {
      expect(cache.isStale('unknown')).toBe(true)
    })
  })

  describe('invalidate', () => {
    it('removes all entries with matching prefix', () => {
      cache.set('people:list:1', { name: 'Luke' }, 60000)
      cache.set('people:detail:1', { name: 'Luke' }, 60000)
      cache.set('planets:list:1', { name: 'Tatooine' }, 60000)

      cache.invalidate('people:')

      expect(cache.get('people:list:1')).toBeNull()
      expect(cache.get('people:detail:1')).toBeNull()
      expect(cache.get('planets:list:1')).toEqual({ name: 'Tatooine' })
    })

    it('does nothing when no keys match prefix', () => {
      cache.set('planets:list:1', { name: 'Tatooine' }, 60000)
      cache.invalidate('people:')
      expect(cache.get('planets:list:1')).toEqual({ name: 'Tatooine' })
    })
  })

  describe('clear', () => {
    it('removes all entries', () => {
      cache.set('key1', 'value', 60000)
      cache.set('key2', 'value2', 60000)

      cache.clear()

      expect(cache.get('key1')).toBeNull()
      expect(cache.get('key2')).toBeNull()
    })
  })
})
