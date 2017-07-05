// @flow

type Provider<T> = () => T
type Predicate<T> = (t: T) => boolean
type Consumer<T> = (t: T) => void

export default class Option<T> {
  isEmpty(): boolean { throw new Error('Not implemented method')}
  isNotEmpty(): boolean { throw new Error('Not implemented method')}
  getOrElse(provider: Provider<T> | T): T { throw new Error('Not implemented method')}
  getOrFail(error: Provider<Error> | Error): T { throw new Error('Not implemented method')}
  getOrNull(): T | null { throw new Error('Not implemented method')}
  map<U>(mapper: (t: T) => U): Option<U> { throw new Error('Not implemented method')}
  flatMap<U>(mapper: (t: T) => Option<U>): Option<U> { throw new Error('Not implemented method')}
  filter(predicate: Predicate<T>): Option<T> { throw new Error('Not implemented method')}
  exists(predicate: Predicate<T>): boolean { throw new Error('Not implemented method')}
  forEach(consumer: Consumer<T>): void { throw new Error('Not implemented method')}

  // eslint-disable-next-line
  static some<T>(t: T): Option<T> { return new Some(t) }

  // eslint-disable-next-line
  static none<T>(): Option<T> { return new None() }

  static option<T>(t: ?T): Option<T> {
    return t? Option.some(t) : Option.none()
  }

  static merge<T, U>(first: Option<T>, second: Option<U>): Option<[T, U]> {
    const error = new Error('Error while merging options')

    return first.isEmpty() || second.isEmpty() ?
      Option.none() :
      Option.some([first.getOrFail(error), second.getOrFail(error)])
  }
}

class Some<T> extends Option<T> {
  t: T

  constructor(t: T) {
    super()
    this.t = t
  }

  isEmpty(): boolean { return false }

  isNotEmpty(): boolean { return true }

  getOrElse(provider: Provider<T> | T): T { return this.t }

  getOrFail(error: Provider<Error> | Error): T { return this.t }

  getOrNull(): T | null { return this.t }

  map<U>(mapper: (t: T) => U): Option<U> { return new Some(mapper(this.t)) }

  flatMap<U>(mapper: (t: T) => Option<U>): Option<U> { return mapper(this.t) }

  filter(predicate: Predicate<T>): Option<T> {
    const result = predicate(this.t)
    // eslint-disable-next-line
    return result? this : new None()
  }

  exists(predicate: Predicate<T>): boolean { return predicate(this.t) }

  forEach(consumer: Consumer<T>): void { consumer(this.t) }
}

class None<T> extends Option<T> {

  isEmpty(): boolean { return true }

  isNotEmpty(): boolean { return false }

  getOrElse(provider: Provider<T> | T): T {
    return typeof provider === 'function'? provider() : provider
  }

  getOrFail(error: Provider<Error> | Error): T {
    throw typeof error === 'function'? error() : error
  }

  getOrNull(): T | null { return null }

  map<U>(mapper: (t: T) => U): Option<U> { return new None() }

  flatMap<U>(mapper: (t: T) => Option<U>): Option<U> { return new None() }

  filter(predicate: Predicate<T>): Option<T> { return this }

  exists(predicate: Predicate<T>): boolean { return false }

  forEach(consumer: Consumer<T>): void { }
}