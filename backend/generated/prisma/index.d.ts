
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Anime
 * 
 */
export type Anime = $Result.DefaultSelection<Prisma.$AnimePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserGame
 * 
 */
export type UserGame = $Result.DefaultSelection<Prisma.$UserGamePayload>
/**
 * Model Top100Game
 * 
 */
export type Top100Game = $Result.DefaultSelection<Prisma.$Top100GamePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Games
 * const games = await prisma.game.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Games
   * const games = await prisma.game.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.anime`: Exposes CRUD operations for the **Anime** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Anime
    * const anime = await prisma.anime.findMany()
    * ```
    */
  get anime(): Prisma.AnimeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGame`: Exposes CRUD operations for the **UserGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGames
    * const userGames = await prisma.userGame.findMany()
    * ```
    */
  get userGame(): Prisma.UserGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.top100Game`: Exposes CRUD operations for the **Top100Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Top100Games
    * const top100Games = await prisma.top100Game.findMany()
    * ```
    */
  get top100Game(): Prisma.Top100GameDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Game: 'Game',
    Anime: 'Anime',
    User: 'User',
    UserGame: 'UserGame',
    Top100Game: 'Top100Game'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "game" | "anime" | "user" | "userGame" | "top100Game"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Anime: {
        payload: Prisma.$AnimePayload<ExtArgs>
        fields: Prisma.AnimeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findFirst: {
            args: Prisma.AnimeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findMany: {
            args: Prisma.AnimeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          create: {
            args: Prisma.AnimeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          createMany: {
            args: Prisma.AnimeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          delete: {
            args: Prisma.AnimeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          update: {
            args: Prisma.AnimeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          deleteMany: {
            args: Prisma.AnimeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnimeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          upsert: {
            args: Prisma.AnimeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          aggregate: {
            args: Prisma.AnimeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnime>
          }
          groupBy: {
            args: Prisma.AnimeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimeCountArgs<ExtArgs>
            result: $Utils.Optional<AnimeCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserGame: {
        payload: Prisma.$UserGamePayload<ExtArgs>
        fields: Prisma.UserGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          findFirst: {
            args: Prisma.UserGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          findMany: {
            args: Prisma.UserGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          create: {
            args: Prisma.UserGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          createMany: {
            args: Prisma.UserGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          delete: {
            args: Prisma.UserGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          update: {
            args: Prisma.UserGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          deleteMany: {
            args: Prisma.UserGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          upsert: {
            args: Prisma.UserGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          aggregate: {
            args: Prisma.UserGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGame>
          }
          groupBy: {
            args: Prisma.UserGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGameCountArgs<ExtArgs>
            result: $Utils.Optional<UserGameCountAggregateOutputType> | number
          }
        }
      }
      Top100Game: {
        payload: Prisma.$Top100GamePayload<ExtArgs>
        fields: Prisma.Top100GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Top100GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Top100GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          findFirst: {
            args: Prisma.Top100GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Top100GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          findMany: {
            args: Prisma.Top100GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>[]
          }
          create: {
            args: Prisma.Top100GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          createMany: {
            args: Prisma.Top100GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Top100GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>[]
          }
          delete: {
            args: Prisma.Top100GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          update: {
            args: Prisma.Top100GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          deleteMany: {
            args: Prisma.Top100GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Top100GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Top100GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>[]
          }
          upsert: {
            args: Prisma.Top100GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Top100GamePayload>
          }
          aggregate: {
            args: Prisma.Top100GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTop100Game>
          }
          groupBy: {
            args: Prisma.Top100GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<Top100GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.Top100GameCountArgs<ExtArgs>
            result: $Utils.Optional<Top100GameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    game?: GameOmit
    anime?: AnimeOmit
    user?: UserOmit
    userGame?: UserGameOmit
    top100Game?: Top100GameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    rating: number | null
    rating_top: number | null
    ratings_count: number | null
    reviews_text_count: number | null
    added: number | null
    metacritic: number | null
    playtime: number | null
    suggestions_count: number | null
    user_game: number | null
    reviews_count: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    rating: number | null
    rating_top: number | null
    ratings_count: number | null
    reviews_text_count: number | null
    added: number | null
    metacritic: number | null
    playtime: number | null
    suggestions_count: number | null
    user_game: number | null
    reviews_count: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    released: string | null
    tba: boolean | null
    background_image: string | null
    rating: number | null
    rating_top: number | null
    ratings_count: number | null
    reviews_text_count: number | null
    added: number | null
    metacritic: number | null
    playtime: number | null
    suggestions_count: number | null
    updated: string | null
    user_game: number | null
    reviews_count: number | null
    saturated_color: string | null
    dominant_color: string | null
    esrb_rating: string | null
    description_raw: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    released: string | null
    tba: boolean | null
    background_image: string | null
    rating: number | null
    rating_top: number | null
    ratings_count: number | null
    reviews_text_count: number | null
    added: number | null
    metacritic: number | null
    playtime: number | null
    suggestions_count: number | null
    updated: string | null
    user_game: number | null
    reviews_count: number | null
    saturated_color: string | null
    dominant_color: string | null
    esrb_rating: string | null
    description_raw: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    released: number
    tba: number
    background_image: number
    rating: number
    rating_top: number
    ratings_count: number
    reviews_text_count: number
    added: number
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: number
    user_game: number
    reviews_count: number
    saturated_color: number
    dominant_color: number
    esrb_rating: number
    description_raw: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    rating?: true
    rating_top?: true
    ratings_count?: true
    reviews_text_count?: true
    added?: true
    metacritic?: true
    playtime?: true
    suggestions_count?: true
    user_game?: true
    reviews_count?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    rating?: true
    rating_top?: true
    ratings_count?: true
    reviews_text_count?: true
    added?: true
    metacritic?: true
    playtime?: true
    suggestions_count?: true
    user_game?: true
    reviews_count?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    released?: true
    tba?: true
    background_image?: true
    rating?: true
    rating_top?: true
    ratings_count?: true
    reviews_text_count?: true
    added?: true
    metacritic?: true
    playtime?: true
    suggestions_count?: true
    updated?: true
    user_game?: true
    reviews_count?: true
    saturated_color?: true
    dominant_color?: true
    esrb_rating?: true
    description_raw?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    released?: true
    tba?: true
    background_image?: true
    rating?: true
    rating_top?: true
    ratings_count?: true
    reviews_text_count?: true
    added?: true
    metacritic?: true
    playtime?: true
    suggestions_count?: true
    updated?: true
    user_game?: true
    reviews_count?: true
    saturated_color?: true
    dominant_color?: true
    esrb_rating?: true
    description_raw?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    released?: true
    tba?: true
    background_image?: true
    rating?: true
    rating_top?: true
    ratings_count?: true
    reviews_text_count?: true
    added?: true
    metacritic?: true
    playtime?: true
    suggestions_count?: true
    updated?: true
    user_game?: true
    reviews_count?: true
    saturated_color?: true
    dominant_color?: true
    esrb_rating?: true
    description_raw?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    slug: string
    name: string
    released: string | null
    tba: boolean | null
    background_image: string | null
    rating: number | null
    rating_top: number | null
    ratings_count: number | null
    reviews_text_count: number | null
    added: number | null
    metacritic: number | null
    playtime: number | null
    suggestions_count: number | null
    updated: string | null
    user_game: number | null
    reviews_count: number | null
    saturated_color: string | null
    dominant_color: string | null
    esrb_rating: string | null
    description_raw: string | null
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    released?: boolean
    tba?: boolean
    background_image?: boolean
    rating?: boolean
    rating_top?: boolean
    ratings_count?: boolean
    reviews_text_count?: boolean
    added?: boolean
    metacritic?: boolean
    playtime?: boolean
    suggestions_count?: boolean
    updated?: boolean
    user_game?: boolean
    reviews_count?: boolean
    saturated_color?: boolean
    dominant_color?: boolean
    esrb_rating?: boolean
    description_raw?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    released?: boolean
    tba?: boolean
    background_image?: boolean
    rating?: boolean
    rating_top?: boolean
    ratings_count?: boolean
    reviews_text_count?: boolean
    added?: boolean
    metacritic?: boolean
    playtime?: boolean
    suggestions_count?: boolean
    updated?: boolean
    user_game?: boolean
    reviews_count?: boolean
    saturated_color?: boolean
    dominant_color?: boolean
    esrb_rating?: boolean
    description_raw?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    released?: boolean
    tba?: boolean
    background_image?: boolean
    rating?: boolean
    rating_top?: boolean
    ratings_count?: boolean
    reviews_text_count?: boolean
    added?: boolean
    metacritic?: boolean
    playtime?: boolean
    suggestions_count?: boolean
    updated?: boolean
    user_game?: boolean
    reviews_count?: boolean
    saturated_color?: boolean
    dominant_color?: boolean
    esrb_rating?: boolean
    description_raw?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    released?: boolean
    tba?: boolean
    background_image?: boolean
    rating?: boolean
    rating_top?: boolean
    ratings_count?: boolean
    reviews_text_count?: boolean
    added?: boolean
    metacritic?: boolean
    playtime?: boolean
    suggestions_count?: boolean
    updated?: boolean
    user_game?: boolean
    reviews_count?: boolean
    saturated_color?: boolean
    dominant_color?: boolean
    esrb_rating?: boolean
    description_raw?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "released" | "tba" | "background_image" | "rating" | "rating_top" | "ratings_count" | "reviews_text_count" | "added" | "metacritic" | "playtime" | "suggestions_count" | "updated" | "user_game" | "reviews_count" | "saturated_color" | "dominant_color" | "esrb_rating" | "description_raw", ExtArgs["result"]["game"]>

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      released: string | null
      tba: boolean | null
      background_image: string | null
      rating: number | null
      rating_top: number | null
      ratings_count: number | null
      reviews_text_count: number | null
      added: number | null
      metacritic: number | null
      playtime: number | null
      suggestions_count: number | null
      updated: string | null
      user_game: number | null
      reviews_count: number | null
      saturated_color: string | null
      dominant_color: string | null
      esrb_rating: string | null
      description_raw: string | null
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly slug: FieldRef<"Game", 'String'>
    readonly name: FieldRef<"Game", 'String'>
    readonly released: FieldRef<"Game", 'String'>
    readonly tba: FieldRef<"Game", 'Boolean'>
    readonly background_image: FieldRef<"Game", 'String'>
    readonly rating: FieldRef<"Game", 'Float'>
    readonly rating_top: FieldRef<"Game", 'Int'>
    readonly ratings_count: FieldRef<"Game", 'Int'>
    readonly reviews_text_count: FieldRef<"Game", 'Int'>
    readonly added: FieldRef<"Game", 'Int'>
    readonly metacritic: FieldRef<"Game", 'Int'>
    readonly playtime: FieldRef<"Game", 'Int'>
    readonly suggestions_count: FieldRef<"Game", 'Int'>
    readonly updated: FieldRef<"Game", 'String'>
    readonly user_game: FieldRef<"Game", 'Int'>
    readonly reviews_count: FieldRef<"Game", 'Int'>
    readonly saturated_color: FieldRef<"Game", 'String'>
    readonly dominant_color: FieldRef<"Game", 'String'>
    readonly esrb_rating: FieldRef<"Game", 'String'>
    readonly description_raw: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
  }


  /**
   * Model Anime
   */

  export type AggregateAnime = {
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  export type AnimeAvgAggregateOutputType = {
    mal_id: number | null
    episodes: number | null
    score: number | null
    scored_by: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    favorites: number | null
    year: number | null
  }

  export type AnimeSumAggregateOutputType = {
    mal_id: number | null
    episodes: number | null
    score: number | null
    scored_by: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    favorites: number | null
    year: number | null
  }

  export type AnimeMinAggregateOutputType = {
    mal_id: number | null
    slug: string | null
    url: string | null
    title: string | null
    title_english: string | null
    title_japanese: string | null
    synopsis: string | null
    background: string | null
    type: string | null
    source: string | null
    episodes: number | null
    status: string | null
    airing: boolean | null
    aired_from: Date | null
    aired_to: Date | null
    duration: string | null
    rating: string | null
    score: number | null
    scored_by: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    favorites: number | null
    season: string | null
    year: number | null
    approved: boolean | null
    broadcast_day: string | null
    broadcast_time: string | null
    broadcast_timezone: string | null
    broadcast_string: string | null
    trailer_url: string | null
    trailer_youtube_id: string | null
    trailer_embed_url: string | null
    image_url: string | null
    image_large_url: string | null
    image_small_url: string | null
    updated_at: Date | null
  }

  export type AnimeMaxAggregateOutputType = {
    mal_id: number | null
    slug: string | null
    url: string | null
    title: string | null
    title_english: string | null
    title_japanese: string | null
    synopsis: string | null
    background: string | null
    type: string | null
    source: string | null
    episodes: number | null
    status: string | null
    airing: boolean | null
    aired_from: Date | null
    aired_to: Date | null
    duration: string | null
    rating: string | null
    score: number | null
    scored_by: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    favorites: number | null
    season: string | null
    year: number | null
    approved: boolean | null
    broadcast_day: string | null
    broadcast_time: string | null
    broadcast_timezone: string | null
    broadcast_string: string | null
    trailer_url: string | null
    trailer_youtube_id: string | null
    trailer_embed_url: string | null
    image_url: string | null
    image_large_url: string | null
    image_small_url: string | null
    updated_at: Date | null
  }

  export type AnimeCountAggregateOutputType = {
    mal_id: number
    slug: number
    url: number
    title: number
    title_english: number
    title_japanese: number
    synopsis: number
    background: number
    type: number
    source: number
    episodes: number
    status: number
    airing: number
    aired_from: number
    aired_to: number
    duration: number
    rating: number
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    season: number
    year: number
    approved: number
    broadcast_day: number
    broadcast_time: number
    broadcast_timezone: number
    broadcast_string: number
    trailer_url: number
    trailer_youtube_id: number
    trailer_embed_url: number
    image_url: number
    image_large_url: number
    image_small_url: number
    updated_at: number
    _all: number
  }


  export type AnimeAvgAggregateInputType = {
    mal_id?: true
    episodes?: true
    score?: true
    scored_by?: true
    rank?: true
    popularity?: true
    members?: true
    favorites?: true
    year?: true
  }

  export type AnimeSumAggregateInputType = {
    mal_id?: true
    episodes?: true
    score?: true
    scored_by?: true
    rank?: true
    popularity?: true
    members?: true
    favorites?: true
    year?: true
  }

  export type AnimeMinAggregateInputType = {
    mal_id?: true
    slug?: true
    url?: true
    title?: true
    title_english?: true
    title_japanese?: true
    synopsis?: true
    background?: true
    type?: true
    source?: true
    episodes?: true
    status?: true
    airing?: true
    aired_from?: true
    aired_to?: true
    duration?: true
    rating?: true
    score?: true
    scored_by?: true
    rank?: true
    popularity?: true
    members?: true
    favorites?: true
    season?: true
    year?: true
    approved?: true
    broadcast_day?: true
    broadcast_time?: true
    broadcast_timezone?: true
    broadcast_string?: true
    trailer_url?: true
    trailer_youtube_id?: true
    trailer_embed_url?: true
    image_url?: true
    image_large_url?: true
    image_small_url?: true
    updated_at?: true
  }

  export type AnimeMaxAggregateInputType = {
    mal_id?: true
    slug?: true
    url?: true
    title?: true
    title_english?: true
    title_japanese?: true
    synopsis?: true
    background?: true
    type?: true
    source?: true
    episodes?: true
    status?: true
    airing?: true
    aired_from?: true
    aired_to?: true
    duration?: true
    rating?: true
    score?: true
    scored_by?: true
    rank?: true
    popularity?: true
    members?: true
    favorites?: true
    season?: true
    year?: true
    approved?: true
    broadcast_day?: true
    broadcast_time?: true
    broadcast_timezone?: true
    broadcast_string?: true
    trailer_url?: true
    trailer_youtube_id?: true
    trailer_embed_url?: true
    image_url?: true
    image_large_url?: true
    image_small_url?: true
    updated_at?: true
  }

  export type AnimeCountAggregateInputType = {
    mal_id?: true
    slug?: true
    url?: true
    title?: true
    title_english?: true
    title_japanese?: true
    synopsis?: true
    background?: true
    type?: true
    source?: true
    episodes?: true
    status?: true
    airing?: true
    aired_from?: true
    aired_to?: true
    duration?: true
    rating?: true
    score?: true
    scored_by?: true
    rank?: true
    popularity?: true
    members?: true
    favorites?: true
    season?: true
    year?: true
    approved?: true
    broadcast_day?: true
    broadcast_time?: true
    broadcast_timezone?: true
    broadcast_string?: true
    trailer_url?: true
    trailer_youtube_id?: true
    trailer_embed_url?: true
    image_url?: true
    image_large_url?: true
    image_small_url?: true
    updated_at?: true
    _all?: true
  }

  export type AnimeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to aggregate.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Anime
    **/
    _count?: true | AnimeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimeMaxAggregateInputType
  }

  export type GetAnimeAggregateType<T extends AnimeAggregateArgs> = {
        [P in keyof T & keyof AggregateAnime]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnime[P]>
      : GetScalarType<T[P], AggregateAnime[P]>
  }




  export type AnimeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeWhereInput
    orderBy?: AnimeOrderByWithAggregationInput | AnimeOrderByWithAggregationInput[]
    by: AnimeScalarFieldEnum[] | AnimeScalarFieldEnum
    having?: AnimeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimeCountAggregateInputType | true
    _avg?: AnimeAvgAggregateInputType
    _sum?: AnimeSumAggregateInputType
    _min?: AnimeMinAggregateInputType
    _max?: AnimeMaxAggregateInputType
  }

  export type AnimeGroupByOutputType = {
    mal_id: number
    slug: string
    url: string
    title: string
    title_english: string | null
    title_japanese: string | null
    synopsis: string | null
    background: string | null
    type: string | null
    source: string | null
    episodes: number | null
    status: string | null
    airing: boolean
    aired_from: Date | null
    aired_to: Date | null
    duration: string | null
    rating: string | null
    score: number | null
    scored_by: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    favorites: number | null
    season: string | null
    year: number | null
    approved: boolean
    broadcast_day: string | null
    broadcast_time: string | null
    broadcast_timezone: string | null
    broadcast_string: string | null
    trailer_url: string | null
    trailer_youtube_id: string | null
    trailer_embed_url: string | null
    image_url: string | null
    image_large_url: string | null
    image_small_url: string | null
    updated_at: Date
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  type GetAnimeGroupByPayload<T extends AnimeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimeGroupByOutputType[P]>
            : GetScalarType<T[P], AnimeGroupByOutputType[P]>
        }
      >
    >


  export type AnimeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mal_id?: boolean
    slug?: boolean
    url?: boolean
    title?: boolean
    title_english?: boolean
    title_japanese?: boolean
    synopsis?: boolean
    background?: boolean
    type?: boolean
    source?: boolean
    episodes?: boolean
    status?: boolean
    airing?: boolean
    aired_from?: boolean
    aired_to?: boolean
    duration?: boolean
    rating?: boolean
    score?: boolean
    scored_by?: boolean
    rank?: boolean
    popularity?: boolean
    members?: boolean
    favorites?: boolean
    season?: boolean
    year?: boolean
    approved?: boolean
    broadcast_day?: boolean
    broadcast_time?: boolean
    broadcast_timezone?: boolean
    broadcast_string?: boolean
    trailer_url?: boolean
    trailer_youtube_id?: boolean
    trailer_embed_url?: boolean
    image_url?: boolean
    image_large_url?: boolean
    image_small_url?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mal_id?: boolean
    slug?: boolean
    url?: boolean
    title?: boolean
    title_english?: boolean
    title_japanese?: boolean
    synopsis?: boolean
    background?: boolean
    type?: boolean
    source?: boolean
    episodes?: boolean
    status?: boolean
    airing?: boolean
    aired_from?: boolean
    aired_to?: boolean
    duration?: boolean
    rating?: boolean
    score?: boolean
    scored_by?: boolean
    rank?: boolean
    popularity?: boolean
    members?: boolean
    favorites?: boolean
    season?: boolean
    year?: boolean
    approved?: boolean
    broadcast_day?: boolean
    broadcast_time?: boolean
    broadcast_timezone?: boolean
    broadcast_string?: boolean
    trailer_url?: boolean
    trailer_youtube_id?: boolean
    trailer_embed_url?: boolean
    image_url?: boolean
    image_large_url?: boolean
    image_small_url?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mal_id?: boolean
    slug?: boolean
    url?: boolean
    title?: boolean
    title_english?: boolean
    title_japanese?: boolean
    synopsis?: boolean
    background?: boolean
    type?: boolean
    source?: boolean
    episodes?: boolean
    status?: boolean
    airing?: boolean
    aired_from?: boolean
    aired_to?: boolean
    duration?: boolean
    rating?: boolean
    score?: boolean
    scored_by?: boolean
    rank?: boolean
    popularity?: boolean
    members?: boolean
    favorites?: boolean
    season?: boolean
    year?: boolean
    approved?: boolean
    broadcast_day?: boolean
    broadcast_time?: boolean
    broadcast_timezone?: boolean
    broadcast_string?: boolean
    trailer_url?: boolean
    trailer_youtube_id?: boolean
    trailer_embed_url?: boolean
    image_url?: boolean
    image_large_url?: boolean
    image_small_url?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectScalar = {
    mal_id?: boolean
    slug?: boolean
    url?: boolean
    title?: boolean
    title_english?: boolean
    title_japanese?: boolean
    synopsis?: boolean
    background?: boolean
    type?: boolean
    source?: boolean
    episodes?: boolean
    status?: boolean
    airing?: boolean
    aired_from?: boolean
    aired_to?: boolean
    duration?: boolean
    rating?: boolean
    score?: boolean
    scored_by?: boolean
    rank?: boolean
    popularity?: boolean
    members?: boolean
    favorites?: boolean
    season?: boolean
    year?: boolean
    approved?: boolean
    broadcast_day?: boolean
    broadcast_time?: boolean
    broadcast_timezone?: boolean
    broadcast_string?: boolean
    trailer_url?: boolean
    trailer_youtube_id?: boolean
    trailer_embed_url?: boolean
    image_url?: boolean
    image_large_url?: boolean
    image_small_url?: boolean
    updated_at?: boolean
  }

  export type AnimeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"mal_id" | "slug" | "url" | "title" | "title_english" | "title_japanese" | "synopsis" | "background" | "type" | "source" | "episodes" | "status" | "airing" | "aired_from" | "aired_to" | "duration" | "rating" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites" | "season" | "year" | "approved" | "broadcast_day" | "broadcast_time" | "broadcast_timezone" | "broadcast_string" | "trailer_url" | "trailer_youtube_id" | "trailer_embed_url" | "image_url" | "image_large_url" | "image_small_url" | "updated_at", ExtArgs["result"]["anime"]>

  export type $AnimePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Anime"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      mal_id: number
      slug: string
      url: string
      title: string
      title_english: string | null
      title_japanese: string | null
      synopsis: string | null
      background: string | null
      type: string | null
      source: string | null
      episodes: number | null
      status: string | null
      airing: boolean
      aired_from: Date | null
      aired_to: Date | null
      duration: string | null
      rating: string | null
      score: number | null
      scored_by: number | null
      rank: number | null
      popularity: number | null
      members: number | null
      favorites: number | null
      season: string | null
      year: number | null
      approved: boolean
      broadcast_day: string | null
      broadcast_time: string | null
      broadcast_timezone: string | null
      broadcast_string: string | null
      trailer_url: string | null
      trailer_youtube_id: string | null
      trailer_embed_url: string | null
      image_url: string | null
      image_large_url: string | null
      image_small_url: string | null
      updated_at: Date
    }, ExtArgs["result"]["anime"]>
    composites: {}
  }

  type AnimeGetPayload<S extends boolean | null | undefined | AnimeDefaultArgs> = $Result.GetResult<Prisma.$AnimePayload, S>

  type AnimeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimeCountAggregateInputType | true
    }

  export interface AnimeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Anime'], meta: { name: 'Anime' } }
    /**
     * Find zero or one Anime that matches the filter.
     * @param {AnimeFindUniqueArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimeFindUniqueArgs>(args: SelectSubset<T, AnimeFindUniqueArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Anime that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimeFindUniqueOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimeFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimeFindFirstArgs>(args?: SelectSubset<T, AnimeFindFirstArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anime that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimeFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anime
     * const anime = await prisma.anime.findMany()
     * 
     * // Get first 10 Anime
     * const anime = await prisma.anime.findMany({ take: 10 })
     * 
     * // Only select the `mal_id`
     * const animeWithMal_idOnly = await prisma.anime.findMany({ select: { mal_id: true } })
     * 
     */
    findMany<T extends AnimeFindManyArgs>(args?: SelectSubset<T, AnimeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Anime.
     * @param {AnimeCreateArgs} args - Arguments to create a Anime.
     * @example
     * // Create one Anime
     * const Anime = await prisma.anime.create({
     *   data: {
     *     // ... data to create a Anime
     *   }
     * })
     * 
     */
    create<T extends AnimeCreateArgs>(args: SelectSubset<T, AnimeCreateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Anime.
     * @param {AnimeCreateManyArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimeCreateManyArgs>(args?: SelectSubset<T, AnimeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Anime and returns the data saved in the database.
     * @param {AnimeCreateManyAndReturnArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Anime and only return the `mal_id`
     * const animeWithMal_idOnly = await prisma.anime.createManyAndReturn({
     *   select: { mal_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimeCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Anime.
     * @param {AnimeDeleteArgs} args - Arguments to delete one Anime.
     * @example
     * // Delete one Anime
     * const Anime = await prisma.anime.delete({
     *   where: {
     *     // ... filter to delete one Anime
     *   }
     * })
     * 
     */
    delete<T extends AnimeDeleteArgs>(args: SelectSubset<T, AnimeDeleteArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Anime.
     * @param {AnimeUpdateArgs} args - Arguments to update one Anime.
     * @example
     * // Update one Anime
     * const anime = await prisma.anime.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimeUpdateArgs>(args: SelectSubset<T, AnimeUpdateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Anime.
     * @param {AnimeDeleteManyArgs} args - Arguments to filter Anime to delete.
     * @example
     * // Delete a few Anime
     * const { count } = await prisma.anime.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimeDeleteManyArgs>(args?: SelectSubset<T, AnimeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anime
     * const anime = await prisma.anime.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimeUpdateManyArgs>(args: SelectSubset<T, AnimeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anime and returns the data updated in the database.
     * @param {AnimeUpdateManyAndReturnArgs} args - Arguments to update many Anime.
     * @example
     * // Update many Anime
     * const anime = await prisma.anime.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Anime and only return the `mal_id`
     * const animeWithMal_idOnly = await prisma.anime.updateManyAndReturn({
     *   select: { mal_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnimeUpdateManyAndReturnArgs>(args: SelectSubset<T, AnimeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Anime.
     * @param {AnimeUpsertArgs} args - Arguments to update or create a Anime.
     * @example
     * // Update or create a Anime
     * const anime = await prisma.anime.upsert({
     *   create: {
     *     // ... data to create a Anime
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anime we want to update
     *   }
     * })
     */
    upsert<T extends AnimeUpsertArgs>(args: SelectSubset<T, AnimeUpsertArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeCountArgs} args - Arguments to filter Anime to count.
     * @example
     * // Count the number of Anime
     * const count = await prisma.anime.count({
     *   where: {
     *     // ... the filter for the Anime we want to count
     *   }
     * })
    **/
    count<T extends AnimeCountArgs>(
      args?: Subset<T, AnimeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimeAggregateArgs>(args: Subset<T, AnimeAggregateArgs>): Prisma.PrismaPromise<GetAnimeAggregateType<T>>

    /**
     * Group by Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimeGroupByArgs['orderBy'] }
        : { orderBy?: AnimeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Anime model
   */
  readonly fields: AnimeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Anime.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Anime model
   */
  interface AnimeFieldRefs {
    readonly mal_id: FieldRef<"Anime", 'Int'>
    readonly slug: FieldRef<"Anime", 'String'>
    readonly url: FieldRef<"Anime", 'String'>
    readonly title: FieldRef<"Anime", 'String'>
    readonly title_english: FieldRef<"Anime", 'String'>
    readonly title_japanese: FieldRef<"Anime", 'String'>
    readonly synopsis: FieldRef<"Anime", 'String'>
    readonly background: FieldRef<"Anime", 'String'>
    readonly type: FieldRef<"Anime", 'String'>
    readonly source: FieldRef<"Anime", 'String'>
    readonly episodes: FieldRef<"Anime", 'Int'>
    readonly status: FieldRef<"Anime", 'String'>
    readonly airing: FieldRef<"Anime", 'Boolean'>
    readonly aired_from: FieldRef<"Anime", 'DateTime'>
    readonly aired_to: FieldRef<"Anime", 'DateTime'>
    readonly duration: FieldRef<"Anime", 'String'>
    readonly rating: FieldRef<"Anime", 'String'>
    readonly score: FieldRef<"Anime", 'Float'>
    readonly scored_by: FieldRef<"Anime", 'Int'>
    readonly rank: FieldRef<"Anime", 'Int'>
    readonly popularity: FieldRef<"Anime", 'Int'>
    readonly members: FieldRef<"Anime", 'Int'>
    readonly favorites: FieldRef<"Anime", 'Int'>
    readonly season: FieldRef<"Anime", 'String'>
    readonly year: FieldRef<"Anime", 'Int'>
    readonly approved: FieldRef<"Anime", 'Boolean'>
    readonly broadcast_day: FieldRef<"Anime", 'String'>
    readonly broadcast_time: FieldRef<"Anime", 'String'>
    readonly broadcast_timezone: FieldRef<"Anime", 'String'>
    readonly broadcast_string: FieldRef<"Anime", 'String'>
    readonly trailer_url: FieldRef<"Anime", 'String'>
    readonly trailer_youtube_id: FieldRef<"Anime", 'String'>
    readonly trailer_embed_url: FieldRef<"Anime", 'String'>
    readonly image_url: FieldRef<"Anime", 'String'>
    readonly image_large_url: FieldRef<"Anime", 'String'>
    readonly image_small_url: FieldRef<"Anime", 'String'>
    readonly updated_at: FieldRef<"Anime", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Anime findUnique
   */
  export type AnimeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findUniqueOrThrow
   */
  export type AnimeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findFirst
   */
  export type AnimeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findFirstOrThrow
   */
  export type AnimeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findMany
   */
  export type AnimeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime create
   */
  export type AnimeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data needed to create a Anime.
     */
    data: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
  }

  /**
   * Anime createMany
   */
  export type AnimeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Anime createManyAndReturn
   */
  export type AnimeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Anime update
   */
  export type AnimeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data needed to update a Anime.
     */
    data: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
    /**
     * Choose, which Anime to update.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime updateMany
   */
  export type AnimeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Anime.
     */
    data: XOR<AnimeUpdateManyMutationInput, AnimeUncheckedUpdateManyInput>
    /**
     * Filter which Anime to update
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to update.
     */
    limit?: number
  }

  /**
   * Anime updateManyAndReturn
   */
  export type AnimeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data used to update Anime.
     */
    data: XOR<AnimeUpdateManyMutationInput, AnimeUncheckedUpdateManyInput>
    /**
     * Filter which Anime to update
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to update.
     */
    limit?: number
  }

  /**
   * Anime upsert
   */
  export type AnimeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The filter to search for the Anime to update in case it exists.
     */
    where: AnimeWhereUniqueInput
    /**
     * In case the Anime found by the `where` argument doesn't exist, create a new Anime with this data.
     */
    create: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
    /**
     * In case the Anime was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
  }

  /**
   * Anime delete
   */
  export type AnimeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Filter which Anime to delete.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime deleteMany
   */
  export type AnimeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to delete
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to delete.
     */
    limit?: number
  }

  /**
   * Anime without action
   */
  export type AnimeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    created_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    username: string
    password: string
    created_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "created_at", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      username: string
      password: string
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model UserGame
   */

  export type AggregateUserGame = {
    _count: UserGameCountAggregateOutputType | null
    _avg: UserGameAvgAggregateOutputType | null
    _sum: UserGameSumAggregateOutputType | null
    _min: UserGameMinAggregateOutputType | null
    _max: UserGameMaxAggregateOutputType | null
  }

  export type UserGameAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    game_id: number | null
    rating: number | null
  }

  export type UserGameSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    game_id: number | null
    rating: number | null
  }

  export type UserGameMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    game_id: number | null
    rating: number | null
    status: string | null
    created_at: Date | null
  }

  export type UserGameMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    game_id: number | null
    rating: number | null
    status: string | null
    created_at: Date | null
  }

  export type UserGameCountAggregateOutputType = {
    id: number
    user_id: number
    game_id: number
    rating: number
    status: number
    created_at: number
    _all: number
  }


  export type UserGameAvgAggregateInputType = {
    id?: true
    user_id?: true
    game_id?: true
    rating?: true
  }

  export type UserGameSumAggregateInputType = {
    id?: true
    user_id?: true
    game_id?: true
    rating?: true
  }

  export type UserGameMinAggregateInputType = {
    id?: true
    user_id?: true
    game_id?: true
    rating?: true
    status?: true
    created_at?: true
  }

  export type UserGameMaxAggregateInputType = {
    id?: true
    user_id?: true
    game_id?: true
    rating?: true
    status?: true
    created_at?: true
  }

  export type UserGameCountAggregateInputType = {
    id?: true
    user_id?: true
    game_id?: true
    rating?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type UserGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGame to aggregate.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGames
    **/
    _count?: true | UserGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGameMaxAggregateInputType
  }

  export type GetUserGameAggregateType<T extends UserGameAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGame[P]>
      : GetScalarType<T[P], AggregateUserGame[P]>
  }




  export type UserGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameWhereInput
    orderBy?: UserGameOrderByWithAggregationInput | UserGameOrderByWithAggregationInput[]
    by: UserGameScalarFieldEnum[] | UserGameScalarFieldEnum
    having?: UserGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGameCountAggregateInputType | true
    _avg?: UserGameAvgAggregateInputType
    _sum?: UserGameSumAggregateInputType
    _min?: UserGameMinAggregateInputType
    _max?: UserGameMaxAggregateInputType
  }

  export type UserGameGroupByOutputType = {
    id: number
    user_id: number
    game_id: number
    rating: number | null
    status: string | null
    created_at: Date
    _count: UserGameCountAggregateOutputType | null
    _avg: UserGameAvgAggregateOutputType | null
    _sum: UserGameSumAggregateOutputType | null
    _min: UserGameMinAggregateOutputType | null
    _max: UserGameMaxAggregateOutputType | null
  }

  type GetUserGameGroupByPayload<T extends UserGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGameGroupByOutputType[P]>
            : GetScalarType<T[P], UserGameGroupByOutputType[P]>
        }
      >
    >


  export type UserGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    game_id?: boolean
    rating?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    game_id?: boolean
    rating?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    game_id?: boolean
    rating?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectScalar = {
    id?: boolean
    user_id?: boolean
    game_id?: boolean
    rating?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type UserGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "game_id" | "rating" | "status" | "created_at", ExtArgs["result"]["userGame"]>

  export type $UserGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGame"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      game_id: number
      rating: number | null
      status: string | null
      created_at: Date
    }, ExtArgs["result"]["userGame"]>
    composites: {}
  }

  type UserGameGetPayload<S extends boolean | null | undefined | UserGameDefaultArgs> = $Result.GetResult<Prisma.$UserGamePayload, S>

  type UserGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGameCountAggregateInputType | true
    }

  export interface UserGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGame'], meta: { name: 'UserGame' } }
    /**
     * Find zero or one UserGame that matches the filter.
     * @param {UserGameFindUniqueArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGameFindUniqueArgs>(args: SelectSubset<T, UserGameFindUniqueArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGameFindUniqueOrThrowArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGameFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindFirstArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGameFindFirstArgs>(args?: SelectSubset<T, UserGameFindFirstArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindFirstOrThrowArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGameFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGames
     * const userGames = await prisma.userGame.findMany()
     * 
     * // Get first 10 UserGames
     * const userGames = await prisma.userGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userGameWithIdOnly = await prisma.userGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserGameFindManyArgs>(args?: SelectSubset<T, UserGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGame.
     * @param {UserGameCreateArgs} args - Arguments to create a UserGame.
     * @example
     * // Create one UserGame
     * const UserGame = await prisma.userGame.create({
     *   data: {
     *     // ... data to create a UserGame
     *   }
     * })
     * 
     */
    create<T extends UserGameCreateArgs>(args: SelectSubset<T, UserGameCreateArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGames.
     * @param {UserGameCreateManyArgs} args - Arguments to create many UserGames.
     * @example
     * // Create many UserGames
     * const userGame = await prisma.userGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGameCreateManyArgs>(args?: SelectSubset<T, UserGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGames and returns the data saved in the database.
     * @param {UserGameCreateManyAndReturnArgs} args - Arguments to create many UserGames.
     * @example
     * // Create many UserGames
     * const userGame = await prisma.userGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGames and only return the `id`
     * const userGameWithIdOnly = await prisma.userGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGameCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGame.
     * @param {UserGameDeleteArgs} args - Arguments to delete one UserGame.
     * @example
     * // Delete one UserGame
     * const UserGame = await prisma.userGame.delete({
     *   where: {
     *     // ... filter to delete one UserGame
     *   }
     * })
     * 
     */
    delete<T extends UserGameDeleteArgs>(args: SelectSubset<T, UserGameDeleteArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGame.
     * @param {UserGameUpdateArgs} args - Arguments to update one UserGame.
     * @example
     * // Update one UserGame
     * const userGame = await prisma.userGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGameUpdateArgs>(args: SelectSubset<T, UserGameUpdateArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGames.
     * @param {UserGameDeleteManyArgs} args - Arguments to filter UserGames to delete.
     * @example
     * // Delete a few UserGames
     * const { count } = await prisma.userGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGameDeleteManyArgs>(args?: SelectSubset<T, UserGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGames
     * const userGame = await prisma.userGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGameUpdateManyArgs>(args: SelectSubset<T, UserGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGames and returns the data updated in the database.
     * @param {UserGameUpdateManyAndReturnArgs} args - Arguments to update many UserGames.
     * @example
     * // Update many UserGames
     * const userGame = await prisma.userGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGames and only return the `id`
     * const userGameWithIdOnly = await prisma.userGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGameUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGame.
     * @param {UserGameUpsertArgs} args - Arguments to update or create a UserGame.
     * @example
     * // Update or create a UserGame
     * const userGame = await prisma.userGame.upsert({
     *   create: {
     *     // ... data to create a UserGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGame we want to update
     *   }
     * })
     */
    upsert<T extends UserGameUpsertArgs>(args: SelectSubset<T, UserGameUpsertArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameCountArgs} args - Arguments to filter UserGames to count.
     * @example
     * // Count the number of UserGames
     * const count = await prisma.userGame.count({
     *   where: {
     *     // ... the filter for the UserGames we want to count
     *   }
     * })
    **/
    count<T extends UserGameCountArgs>(
      args?: Subset<T, UserGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGameAggregateArgs>(args: Subset<T, UserGameAggregateArgs>): Prisma.PrismaPromise<GetUserGameAggregateType<T>>

    /**
     * Group by UserGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGameGroupByArgs['orderBy'] }
        : { orderBy?: UserGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGame model
   */
  readonly fields: UserGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGame model
   */
  interface UserGameFieldRefs {
    readonly id: FieldRef<"UserGame", 'Int'>
    readonly user_id: FieldRef<"UserGame", 'Int'>
    readonly game_id: FieldRef<"UserGame", 'Int'>
    readonly rating: FieldRef<"UserGame", 'Float'>
    readonly status: FieldRef<"UserGame", 'String'>
    readonly created_at: FieldRef<"UserGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGame findUnique
   */
  export type UserGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame findUniqueOrThrow
   */
  export type UserGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame findFirst
   */
  export type UserGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGames.
     */
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame findFirstOrThrow
   */
  export type UserGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGames.
     */
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame findMany
   */
  export type UserGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter, which UserGames to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame create
   */
  export type UserGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data needed to create a UserGame.
     */
    data: XOR<UserGameCreateInput, UserGameUncheckedCreateInput>
  }

  /**
   * UserGame createMany
   */
  export type UserGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGames.
     */
    data: UserGameCreateManyInput | UserGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGame createManyAndReturn
   */
  export type UserGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data used to create many UserGames.
     */
    data: UserGameCreateManyInput | UserGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGame update
   */
  export type UserGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data needed to update a UserGame.
     */
    data: XOR<UserGameUpdateInput, UserGameUncheckedUpdateInput>
    /**
     * Choose, which UserGame to update.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame updateMany
   */
  export type UserGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGames.
     */
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyInput>
    /**
     * Filter which UserGames to update
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to update.
     */
    limit?: number
  }

  /**
   * UserGame updateManyAndReturn
   */
  export type UserGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data used to update UserGames.
     */
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyInput>
    /**
     * Filter which UserGames to update
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to update.
     */
    limit?: number
  }

  /**
   * UserGame upsert
   */
  export type UserGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The filter to search for the UserGame to update in case it exists.
     */
    where: UserGameWhereUniqueInput
    /**
     * In case the UserGame found by the `where` argument doesn't exist, create a new UserGame with this data.
     */
    create: XOR<UserGameCreateInput, UserGameUncheckedCreateInput>
    /**
     * In case the UserGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGameUpdateInput, UserGameUncheckedUpdateInput>
  }

  /**
   * UserGame delete
   */
  export type UserGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Filter which UserGame to delete.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame deleteMany
   */
  export type UserGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGames to delete
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to delete.
     */
    limit?: number
  }

  /**
   * UserGame without action
   */
  export type UserGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
  }


  /**
   * Model Top100Game
   */

  export type AggregateTop100Game = {
    _count: Top100GameCountAggregateOutputType | null
    _avg: Top100GameAvgAggregateOutputType | null
    _sum: Top100GameSumAggregateOutputType | null
    _min: Top100GameMinAggregateOutputType | null
    _max: Top100GameMaxAggregateOutputType | null
  }

  export type Top100GameAvgAggregateOutputType = {
    id: number | null
    game_id: number | null
    rank: number | null
    value: number | null
  }

  export type Top100GameSumAggregateOutputType = {
    id: number | null
    game_id: number | null
    rank: number | null
    value: number | null
  }

  export type Top100GameMinAggregateOutputType = {
    id: number | null
    game_id: number | null
    rank: number | null
    value: number | null
    created_at: Date | null
  }

  export type Top100GameMaxAggregateOutputType = {
    id: number | null
    game_id: number | null
    rank: number | null
    value: number | null
    created_at: Date | null
  }

  export type Top100GameCountAggregateOutputType = {
    id: number
    game_id: number
    rank: number
    value: number
    created_at: number
    _all: number
  }


  export type Top100GameAvgAggregateInputType = {
    id?: true
    game_id?: true
    rank?: true
    value?: true
  }

  export type Top100GameSumAggregateInputType = {
    id?: true
    game_id?: true
    rank?: true
    value?: true
  }

  export type Top100GameMinAggregateInputType = {
    id?: true
    game_id?: true
    rank?: true
    value?: true
    created_at?: true
  }

  export type Top100GameMaxAggregateInputType = {
    id?: true
    game_id?: true
    rank?: true
    value?: true
    created_at?: true
  }

  export type Top100GameCountAggregateInputType = {
    id?: true
    game_id?: true
    rank?: true
    value?: true
    created_at?: true
    _all?: true
  }

  export type Top100GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Top100Game to aggregate.
     */
    where?: Top100GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Top100Games to fetch.
     */
    orderBy?: Top100GameOrderByWithRelationInput | Top100GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Top100GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Top100Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Top100Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Top100Games
    **/
    _count?: true | Top100GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Top100GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Top100GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Top100GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Top100GameMaxAggregateInputType
  }

  export type GetTop100GameAggregateType<T extends Top100GameAggregateArgs> = {
        [P in keyof T & keyof AggregateTop100Game]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTop100Game[P]>
      : GetScalarType<T[P], AggregateTop100Game[P]>
  }




  export type Top100GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Top100GameWhereInput
    orderBy?: Top100GameOrderByWithAggregationInput | Top100GameOrderByWithAggregationInput[]
    by: Top100GameScalarFieldEnum[] | Top100GameScalarFieldEnum
    having?: Top100GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Top100GameCountAggregateInputType | true
    _avg?: Top100GameAvgAggregateInputType
    _sum?: Top100GameSumAggregateInputType
    _min?: Top100GameMinAggregateInputType
    _max?: Top100GameMaxAggregateInputType
  }

  export type Top100GameGroupByOutputType = {
    id: number
    game_id: number
    rank: number
    value: number | null
    created_at: Date
    _count: Top100GameCountAggregateOutputType | null
    _avg: Top100GameAvgAggregateOutputType | null
    _sum: Top100GameSumAggregateOutputType | null
    _min: Top100GameMinAggregateOutputType | null
    _max: Top100GameMaxAggregateOutputType | null
  }

  type GetTop100GameGroupByPayload<T extends Top100GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Top100GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Top100GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Top100GameGroupByOutputType[P]>
            : GetScalarType<T[P], Top100GameGroupByOutputType[P]>
        }
      >
    >


  export type Top100GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    game_id?: boolean
    rank?: boolean
    value?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["top100Game"]>

  export type Top100GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    game_id?: boolean
    rank?: boolean
    value?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["top100Game"]>

  export type Top100GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    game_id?: boolean
    rank?: boolean
    value?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["top100Game"]>

  export type Top100GameSelectScalar = {
    id?: boolean
    game_id?: boolean
    rank?: boolean
    value?: boolean
    created_at?: boolean
  }

  export type Top100GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "game_id" | "rank" | "value" | "created_at", ExtArgs["result"]["top100Game"]>

  export type $Top100GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Top100Game"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      game_id: number
      rank: number
      value: number | null
      created_at: Date
    }, ExtArgs["result"]["top100Game"]>
    composites: {}
  }

  type Top100GameGetPayload<S extends boolean | null | undefined | Top100GameDefaultArgs> = $Result.GetResult<Prisma.$Top100GamePayload, S>

  type Top100GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Top100GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Top100GameCountAggregateInputType | true
    }

  export interface Top100GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Top100Game'], meta: { name: 'Top100Game' } }
    /**
     * Find zero or one Top100Game that matches the filter.
     * @param {Top100GameFindUniqueArgs} args - Arguments to find a Top100Game
     * @example
     * // Get one Top100Game
     * const top100Game = await prisma.top100Game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Top100GameFindUniqueArgs>(args: SelectSubset<T, Top100GameFindUniqueArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Top100Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Top100GameFindUniqueOrThrowArgs} args - Arguments to find a Top100Game
     * @example
     * // Get one Top100Game
     * const top100Game = await prisma.top100Game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Top100GameFindUniqueOrThrowArgs>(args: SelectSubset<T, Top100GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Top100Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameFindFirstArgs} args - Arguments to find a Top100Game
     * @example
     * // Get one Top100Game
     * const top100Game = await prisma.top100Game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Top100GameFindFirstArgs>(args?: SelectSubset<T, Top100GameFindFirstArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Top100Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameFindFirstOrThrowArgs} args - Arguments to find a Top100Game
     * @example
     * // Get one Top100Game
     * const top100Game = await prisma.top100Game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Top100GameFindFirstOrThrowArgs>(args?: SelectSubset<T, Top100GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Top100Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Top100Games
     * const top100Games = await prisma.top100Game.findMany()
     * 
     * // Get first 10 Top100Games
     * const top100Games = await prisma.top100Game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const top100GameWithIdOnly = await prisma.top100Game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Top100GameFindManyArgs>(args?: SelectSubset<T, Top100GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Top100Game.
     * @param {Top100GameCreateArgs} args - Arguments to create a Top100Game.
     * @example
     * // Create one Top100Game
     * const Top100Game = await prisma.top100Game.create({
     *   data: {
     *     // ... data to create a Top100Game
     *   }
     * })
     * 
     */
    create<T extends Top100GameCreateArgs>(args: SelectSubset<T, Top100GameCreateArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Top100Games.
     * @param {Top100GameCreateManyArgs} args - Arguments to create many Top100Games.
     * @example
     * // Create many Top100Games
     * const top100Game = await prisma.top100Game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Top100GameCreateManyArgs>(args?: SelectSubset<T, Top100GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Top100Games and returns the data saved in the database.
     * @param {Top100GameCreateManyAndReturnArgs} args - Arguments to create many Top100Games.
     * @example
     * // Create many Top100Games
     * const top100Game = await prisma.top100Game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Top100Games and only return the `id`
     * const top100GameWithIdOnly = await prisma.top100Game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Top100GameCreateManyAndReturnArgs>(args?: SelectSubset<T, Top100GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Top100Game.
     * @param {Top100GameDeleteArgs} args - Arguments to delete one Top100Game.
     * @example
     * // Delete one Top100Game
     * const Top100Game = await prisma.top100Game.delete({
     *   where: {
     *     // ... filter to delete one Top100Game
     *   }
     * })
     * 
     */
    delete<T extends Top100GameDeleteArgs>(args: SelectSubset<T, Top100GameDeleteArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Top100Game.
     * @param {Top100GameUpdateArgs} args - Arguments to update one Top100Game.
     * @example
     * // Update one Top100Game
     * const top100Game = await prisma.top100Game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Top100GameUpdateArgs>(args: SelectSubset<T, Top100GameUpdateArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Top100Games.
     * @param {Top100GameDeleteManyArgs} args - Arguments to filter Top100Games to delete.
     * @example
     * // Delete a few Top100Games
     * const { count } = await prisma.top100Game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Top100GameDeleteManyArgs>(args?: SelectSubset<T, Top100GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Top100Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Top100Games
     * const top100Game = await prisma.top100Game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Top100GameUpdateManyArgs>(args: SelectSubset<T, Top100GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Top100Games and returns the data updated in the database.
     * @param {Top100GameUpdateManyAndReturnArgs} args - Arguments to update many Top100Games.
     * @example
     * // Update many Top100Games
     * const top100Game = await prisma.top100Game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Top100Games and only return the `id`
     * const top100GameWithIdOnly = await prisma.top100Game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Top100GameUpdateManyAndReturnArgs>(args: SelectSubset<T, Top100GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Top100Game.
     * @param {Top100GameUpsertArgs} args - Arguments to update or create a Top100Game.
     * @example
     * // Update or create a Top100Game
     * const top100Game = await prisma.top100Game.upsert({
     *   create: {
     *     // ... data to create a Top100Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Top100Game we want to update
     *   }
     * })
     */
    upsert<T extends Top100GameUpsertArgs>(args: SelectSubset<T, Top100GameUpsertArgs<ExtArgs>>): Prisma__Top100GameClient<$Result.GetResult<Prisma.$Top100GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Top100Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameCountArgs} args - Arguments to filter Top100Games to count.
     * @example
     * // Count the number of Top100Games
     * const count = await prisma.top100Game.count({
     *   where: {
     *     // ... the filter for the Top100Games we want to count
     *   }
     * })
    **/
    count<T extends Top100GameCountArgs>(
      args?: Subset<T, Top100GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Top100GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Top100Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Top100GameAggregateArgs>(args: Subset<T, Top100GameAggregateArgs>): Prisma.PrismaPromise<GetTop100GameAggregateType<T>>

    /**
     * Group by Top100Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Top100GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Top100GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Top100GameGroupByArgs['orderBy'] }
        : { orderBy?: Top100GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Top100GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTop100GameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Top100Game model
   */
  readonly fields: Top100GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Top100Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Top100GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Top100Game model
   */
  interface Top100GameFieldRefs {
    readonly id: FieldRef<"Top100Game", 'Int'>
    readonly game_id: FieldRef<"Top100Game", 'Int'>
    readonly rank: FieldRef<"Top100Game", 'Int'>
    readonly value: FieldRef<"Top100Game", 'Float'>
    readonly created_at: FieldRef<"Top100Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Top100Game findUnique
   */
  export type Top100GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter, which Top100Game to fetch.
     */
    where: Top100GameWhereUniqueInput
  }

  /**
   * Top100Game findUniqueOrThrow
   */
  export type Top100GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter, which Top100Game to fetch.
     */
    where: Top100GameWhereUniqueInput
  }

  /**
   * Top100Game findFirst
   */
  export type Top100GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter, which Top100Game to fetch.
     */
    where?: Top100GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Top100Games to fetch.
     */
    orderBy?: Top100GameOrderByWithRelationInput | Top100GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Top100Games.
     */
    cursor?: Top100GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Top100Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Top100Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Top100Games.
     */
    distinct?: Top100GameScalarFieldEnum | Top100GameScalarFieldEnum[]
  }

  /**
   * Top100Game findFirstOrThrow
   */
  export type Top100GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter, which Top100Game to fetch.
     */
    where?: Top100GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Top100Games to fetch.
     */
    orderBy?: Top100GameOrderByWithRelationInput | Top100GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Top100Games.
     */
    cursor?: Top100GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Top100Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Top100Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Top100Games.
     */
    distinct?: Top100GameScalarFieldEnum | Top100GameScalarFieldEnum[]
  }

  /**
   * Top100Game findMany
   */
  export type Top100GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter, which Top100Games to fetch.
     */
    where?: Top100GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Top100Games to fetch.
     */
    orderBy?: Top100GameOrderByWithRelationInput | Top100GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Top100Games.
     */
    cursor?: Top100GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Top100Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Top100Games.
     */
    skip?: number
    distinct?: Top100GameScalarFieldEnum | Top100GameScalarFieldEnum[]
  }

  /**
   * Top100Game create
   */
  export type Top100GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * The data needed to create a Top100Game.
     */
    data: XOR<Top100GameCreateInput, Top100GameUncheckedCreateInput>
  }

  /**
   * Top100Game createMany
   */
  export type Top100GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Top100Games.
     */
    data: Top100GameCreateManyInput | Top100GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Top100Game createManyAndReturn
   */
  export type Top100GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * The data used to create many Top100Games.
     */
    data: Top100GameCreateManyInput | Top100GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Top100Game update
   */
  export type Top100GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * The data needed to update a Top100Game.
     */
    data: XOR<Top100GameUpdateInput, Top100GameUncheckedUpdateInput>
    /**
     * Choose, which Top100Game to update.
     */
    where: Top100GameWhereUniqueInput
  }

  /**
   * Top100Game updateMany
   */
  export type Top100GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Top100Games.
     */
    data: XOR<Top100GameUpdateManyMutationInput, Top100GameUncheckedUpdateManyInput>
    /**
     * Filter which Top100Games to update
     */
    where?: Top100GameWhereInput
    /**
     * Limit how many Top100Games to update.
     */
    limit?: number
  }

  /**
   * Top100Game updateManyAndReturn
   */
  export type Top100GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * The data used to update Top100Games.
     */
    data: XOR<Top100GameUpdateManyMutationInput, Top100GameUncheckedUpdateManyInput>
    /**
     * Filter which Top100Games to update
     */
    where?: Top100GameWhereInput
    /**
     * Limit how many Top100Games to update.
     */
    limit?: number
  }

  /**
   * Top100Game upsert
   */
  export type Top100GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * The filter to search for the Top100Game to update in case it exists.
     */
    where: Top100GameWhereUniqueInput
    /**
     * In case the Top100Game found by the `where` argument doesn't exist, create a new Top100Game with this data.
     */
    create: XOR<Top100GameCreateInput, Top100GameUncheckedCreateInput>
    /**
     * In case the Top100Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Top100GameUpdateInput, Top100GameUncheckedUpdateInput>
  }

  /**
   * Top100Game delete
   */
  export type Top100GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
    /**
     * Filter which Top100Game to delete.
     */
    where: Top100GameWhereUniqueInput
  }

  /**
   * Top100Game deleteMany
   */
  export type Top100GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Top100Games to delete
     */
    where?: Top100GameWhereInput
    /**
     * Limit how many Top100Games to delete.
     */
    limit?: number
  }

  /**
   * Top100Game without action
   */
  export type Top100GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Top100Game
     */
    select?: Top100GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Top100Game
     */
    omit?: Top100GameOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GameScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    released: 'released',
    tba: 'tba',
    background_image: 'background_image',
    rating: 'rating',
    rating_top: 'rating_top',
    ratings_count: 'ratings_count',
    reviews_text_count: 'reviews_text_count',
    added: 'added',
    metacritic: 'metacritic',
    playtime: 'playtime',
    suggestions_count: 'suggestions_count',
    updated: 'updated',
    user_game: 'user_game',
    reviews_count: 'reviews_count',
    saturated_color: 'saturated_color',
    dominant_color: 'dominant_color',
    esrb_rating: 'esrb_rating',
    description_raw: 'description_raw'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const AnimeScalarFieldEnum: {
    mal_id: 'mal_id',
    slug: 'slug',
    url: 'url',
    title: 'title',
    title_english: 'title_english',
    title_japanese: 'title_japanese',
    synopsis: 'synopsis',
    background: 'background',
    type: 'type',
    source: 'source',
    episodes: 'episodes',
    status: 'status',
    airing: 'airing',
    aired_from: 'aired_from',
    aired_to: 'aired_to',
    duration: 'duration',
    rating: 'rating',
    score: 'score',
    scored_by: 'scored_by',
    rank: 'rank',
    popularity: 'popularity',
    members: 'members',
    favorites: 'favorites',
    season: 'season',
    year: 'year',
    approved: 'approved',
    broadcast_day: 'broadcast_day',
    broadcast_time: 'broadcast_time',
    broadcast_timezone: 'broadcast_timezone',
    broadcast_string: 'broadcast_string',
    trailer_url: 'trailer_url',
    trailer_youtube_id: 'trailer_youtube_id',
    trailer_embed_url: 'trailer_embed_url',
    image_url: 'image_url',
    image_large_url: 'image_large_url',
    image_small_url: 'image_small_url',
    updated_at: 'updated_at'
  };

  export type AnimeScalarFieldEnum = (typeof AnimeScalarFieldEnum)[keyof typeof AnimeScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserGameScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    game_id: 'game_id',
    rating: 'rating',
    status: 'status',
    created_at: 'created_at'
  };

  export type UserGameScalarFieldEnum = (typeof UserGameScalarFieldEnum)[keyof typeof UserGameScalarFieldEnum]


  export const Top100GameScalarFieldEnum: {
    id: 'id',
    game_id: 'game_id',
    rank: 'rank',
    value: 'value',
    created_at: 'created_at'
  };

  export type Top100GameScalarFieldEnum = (typeof Top100GameScalarFieldEnum)[keyof typeof Top100GameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    slug?: StringFilter<"Game"> | string
    name?: StringFilter<"Game"> | string
    released?: StringNullableFilter<"Game"> | string | null
    tba?: BoolNullableFilter<"Game"> | boolean | null
    background_image?: StringNullableFilter<"Game"> | string | null
    rating?: FloatNullableFilter<"Game"> | number | null
    rating_top?: IntNullableFilter<"Game"> | number | null
    ratings_count?: IntNullableFilter<"Game"> | number | null
    reviews_text_count?: IntNullableFilter<"Game"> | number | null
    added?: IntNullableFilter<"Game"> | number | null
    metacritic?: IntNullableFilter<"Game"> | number | null
    playtime?: IntNullableFilter<"Game"> | number | null
    suggestions_count?: IntNullableFilter<"Game"> | number | null
    updated?: StringNullableFilter<"Game"> | string | null
    user_game?: IntNullableFilter<"Game"> | number | null
    reviews_count?: IntNullableFilter<"Game"> | number | null
    saturated_color?: StringNullableFilter<"Game"> | string | null
    dominant_color?: StringNullableFilter<"Game"> | string | null
    esrb_rating?: StringNullableFilter<"Game"> | string | null
    description_raw?: StringNullableFilter<"Game"> | string | null
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    released?: SortOrderInput | SortOrder
    tba?: SortOrderInput | SortOrder
    background_image?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    rating_top?: SortOrderInput | SortOrder
    ratings_count?: SortOrderInput | SortOrder
    reviews_text_count?: SortOrderInput | SortOrder
    added?: SortOrderInput | SortOrder
    metacritic?: SortOrderInput | SortOrder
    playtime?: SortOrderInput | SortOrder
    suggestions_count?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    user_game?: SortOrderInput | SortOrder
    reviews_count?: SortOrderInput | SortOrder
    saturated_color?: SortOrderInput | SortOrder
    dominant_color?: SortOrderInput | SortOrder
    esrb_rating?: SortOrderInput | SortOrder
    description_raw?: SortOrderInput | SortOrder
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    slug?: StringFilter<"Game"> | string
    name?: StringFilter<"Game"> | string
    released?: StringNullableFilter<"Game"> | string | null
    tba?: BoolNullableFilter<"Game"> | boolean | null
    background_image?: StringNullableFilter<"Game"> | string | null
    rating?: FloatNullableFilter<"Game"> | number | null
    rating_top?: IntNullableFilter<"Game"> | number | null
    ratings_count?: IntNullableFilter<"Game"> | number | null
    reviews_text_count?: IntNullableFilter<"Game"> | number | null
    added?: IntNullableFilter<"Game"> | number | null
    metacritic?: IntNullableFilter<"Game"> | number | null
    playtime?: IntNullableFilter<"Game"> | number | null
    suggestions_count?: IntNullableFilter<"Game"> | number | null
    updated?: StringNullableFilter<"Game"> | string | null
    user_game?: IntNullableFilter<"Game"> | number | null
    reviews_count?: IntNullableFilter<"Game"> | number | null
    saturated_color?: StringNullableFilter<"Game"> | string | null
    dominant_color?: StringNullableFilter<"Game"> | string | null
    esrb_rating?: StringNullableFilter<"Game"> | string | null
    description_raw?: StringNullableFilter<"Game"> | string | null
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    released?: SortOrderInput | SortOrder
    tba?: SortOrderInput | SortOrder
    background_image?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    rating_top?: SortOrderInput | SortOrder
    ratings_count?: SortOrderInput | SortOrder
    reviews_text_count?: SortOrderInput | SortOrder
    added?: SortOrderInput | SortOrder
    metacritic?: SortOrderInput | SortOrder
    playtime?: SortOrderInput | SortOrder
    suggestions_count?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    user_game?: SortOrderInput | SortOrder
    reviews_count?: SortOrderInput | SortOrder
    saturated_color?: SortOrderInput | SortOrder
    dominant_color?: SortOrderInput | SortOrder
    esrb_rating?: SortOrderInput | SortOrder
    description_raw?: SortOrderInput | SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    slug?: StringWithAggregatesFilter<"Game"> | string
    name?: StringWithAggregatesFilter<"Game"> | string
    released?: StringNullableWithAggregatesFilter<"Game"> | string | null
    tba?: BoolNullableWithAggregatesFilter<"Game"> | boolean | null
    background_image?: StringNullableWithAggregatesFilter<"Game"> | string | null
    rating?: FloatNullableWithAggregatesFilter<"Game"> | number | null
    rating_top?: IntNullableWithAggregatesFilter<"Game"> | number | null
    ratings_count?: IntNullableWithAggregatesFilter<"Game"> | number | null
    reviews_text_count?: IntNullableWithAggregatesFilter<"Game"> | number | null
    added?: IntNullableWithAggregatesFilter<"Game"> | number | null
    metacritic?: IntNullableWithAggregatesFilter<"Game"> | number | null
    playtime?: IntNullableWithAggregatesFilter<"Game"> | number | null
    suggestions_count?: IntNullableWithAggregatesFilter<"Game"> | number | null
    updated?: StringNullableWithAggregatesFilter<"Game"> | string | null
    user_game?: IntNullableWithAggregatesFilter<"Game"> | number | null
    reviews_count?: IntNullableWithAggregatesFilter<"Game"> | number | null
    saturated_color?: StringNullableWithAggregatesFilter<"Game"> | string | null
    dominant_color?: StringNullableWithAggregatesFilter<"Game"> | string | null
    esrb_rating?: StringNullableWithAggregatesFilter<"Game"> | string | null
    description_raw?: StringNullableWithAggregatesFilter<"Game"> | string | null
  }

  export type AnimeWhereInput = {
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    mal_id?: IntFilter<"Anime"> | number
    slug?: StringFilter<"Anime"> | string
    url?: StringFilter<"Anime"> | string
    title?: StringFilter<"Anime"> | string
    title_english?: StringNullableFilter<"Anime"> | string | null
    title_japanese?: StringNullableFilter<"Anime"> | string | null
    synopsis?: StringNullableFilter<"Anime"> | string | null
    background?: StringNullableFilter<"Anime"> | string | null
    type?: StringNullableFilter<"Anime"> | string | null
    source?: StringNullableFilter<"Anime"> | string | null
    episodes?: IntNullableFilter<"Anime"> | number | null
    status?: StringNullableFilter<"Anime"> | string | null
    airing?: BoolFilter<"Anime"> | boolean
    aired_from?: DateTimeNullableFilter<"Anime"> | Date | string | null
    aired_to?: DateTimeNullableFilter<"Anime"> | Date | string | null
    duration?: StringNullableFilter<"Anime"> | string | null
    rating?: StringNullableFilter<"Anime"> | string | null
    score?: FloatNullableFilter<"Anime"> | number | null
    scored_by?: IntNullableFilter<"Anime"> | number | null
    rank?: IntNullableFilter<"Anime"> | number | null
    popularity?: IntNullableFilter<"Anime"> | number | null
    members?: IntNullableFilter<"Anime"> | number | null
    favorites?: IntNullableFilter<"Anime"> | number | null
    season?: StringNullableFilter<"Anime"> | string | null
    year?: IntNullableFilter<"Anime"> | number | null
    approved?: BoolFilter<"Anime"> | boolean
    broadcast_day?: StringNullableFilter<"Anime"> | string | null
    broadcast_time?: StringNullableFilter<"Anime"> | string | null
    broadcast_timezone?: StringNullableFilter<"Anime"> | string | null
    broadcast_string?: StringNullableFilter<"Anime"> | string | null
    trailer_url?: StringNullableFilter<"Anime"> | string | null
    trailer_youtube_id?: StringNullableFilter<"Anime"> | string | null
    trailer_embed_url?: StringNullableFilter<"Anime"> | string | null
    image_url?: StringNullableFilter<"Anime"> | string | null
    image_large_url?: StringNullableFilter<"Anime"> | string | null
    image_small_url?: StringNullableFilter<"Anime"> | string | null
    updated_at?: DateTimeFilter<"Anime"> | Date | string
  }

  export type AnimeOrderByWithRelationInput = {
    mal_id?: SortOrder
    slug?: SortOrder
    url?: SortOrder
    title?: SortOrder
    title_english?: SortOrderInput | SortOrder
    title_japanese?: SortOrderInput | SortOrder
    synopsis?: SortOrderInput | SortOrder
    background?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    episodes?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    airing?: SortOrder
    aired_from?: SortOrderInput | SortOrder
    aired_to?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    scored_by?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    members?: SortOrderInput | SortOrder
    favorites?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    approved?: SortOrder
    broadcast_day?: SortOrderInput | SortOrder
    broadcast_time?: SortOrderInput | SortOrder
    broadcast_timezone?: SortOrderInput | SortOrder
    broadcast_string?: SortOrderInput | SortOrder
    trailer_url?: SortOrderInput | SortOrder
    trailer_youtube_id?: SortOrderInput | SortOrder
    trailer_embed_url?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    image_large_url?: SortOrderInput | SortOrder
    image_small_url?: SortOrderInput | SortOrder
    updated_at?: SortOrder
  }

  export type AnimeWhereUniqueInput = Prisma.AtLeast<{
    mal_id?: number
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    slug?: StringFilter<"Anime"> | string
    url?: StringFilter<"Anime"> | string
    title?: StringFilter<"Anime"> | string
    title_english?: StringNullableFilter<"Anime"> | string | null
    title_japanese?: StringNullableFilter<"Anime"> | string | null
    synopsis?: StringNullableFilter<"Anime"> | string | null
    background?: StringNullableFilter<"Anime"> | string | null
    type?: StringNullableFilter<"Anime"> | string | null
    source?: StringNullableFilter<"Anime"> | string | null
    episodes?: IntNullableFilter<"Anime"> | number | null
    status?: StringNullableFilter<"Anime"> | string | null
    airing?: BoolFilter<"Anime"> | boolean
    aired_from?: DateTimeNullableFilter<"Anime"> | Date | string | null
    aired_to?: DateTimeNullableFilter<"Anime"> | Date | string | null
    duration?: StringNullableFilter<"Anime"> | string | null
    rating?: StringNullableFilter<"Anime"> | string | null
    score?: FloatNullableFilter<"Anime"> | number | null
    scored_by?: IntNullableFilter<"Anime"> | number | null
    rank?: IntNullableFilter<"Anime"> | number | null
    popularity?: IntNullableFilter<"Anime"> | number | null
    members?: IntNullableFilter<"Anime"> | number | null
    favorites?: IntNullableFilter<"Anime"> | number | null
    season?: StringNullableFilter<"Anime"> | string | null
    year?: IntNullableFilter<"Anime"> | number | null
    approved?: BoolFilter<"Anime"> | boolean
    broadcast_day?: StringNullableFilter<"Anime"> | string | null
    broadcast_time?: StringNullableFilter<"Anime"> | string | null
    broadcast_timezone?: StringNullableFilter<"Anime"> | string | null
    broadcast_string?: StringNullableFilter<"Anime"> | string | null
    trailer_url?: StringNullableFilter<"Anime"> | string | null
    trailer_youtube_id?: StringNullableFilter<"Anime"> | string | null
    trailer_embed_url?: StringNullableFilter<"Anime"> | string | null
    image_url?: StringNullableFilter<"Anime"> | string | null
    image_large_url?: StringNullableFilter<"Anime"> | string | null
    image_small_url?: StringNullableFilter<"Anime"> | string | null
    updated_at?: DateTimeFilter<"Anime"> | Date | string
  }, "mal_id">

  export type AnimeOrderByWithAggregationInput = {
    mal_id?: SortOrder
    slug?: SortOrder
    url?: SortOrder
    title?: SortOrder
    title_english?: SortOrderInput | SortOrder
    title_japanese?: SortOrderInput | SortOrder
    synopsis?: SortOrderInput | SortOrder
    background?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    episodes?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    airing?: SortOrder
    aired_from?: SortOrderInput | SortOrder
    aired_to?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    scored_by?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    members?: SortOrderInput | SortOrder
    favorites?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    approved?: SortOrder
    broadcast_day?: SortOrderInput | SortOrder
    broadcast_time?: SortOrderInput | SortOrder
    broadcast_timezone?: SortOrderInput | SortOrder
    broadcast_string?: SortOrderInput | SortOrder
    trailer_url?: SortOrderInput | SortOrder
    trailer_youtube_id?: SortOrderInput | SortOrder
    trailer_embed_url?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    image_large_url?: SortOrderInput | SortOrder
    image_small_url?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: AnimeCountOrderByAggregateInput
    _avg?: AnimeAvgOrderByAggregateInput
    _max?: AnimeMaxOrderByAggregateInput
    _min?: AnimeMinOrderByAggregateInput
    _sum?: AnimeSumOrderByAggregateInput
  }

  export type AnimeScalarWhereWithAggregatesInput = {
    AND?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    OR?: AnimeScalarWhereWithAggregatesInput[]
    NOT?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    mal_id?: IntWithAggregatesFilter<"Anime"> | number
    slug?: StringWithAggregatesFilter<"Anime"> | string
    url?: StringWithAggregatesFilter<"Anime"> | string
    title?: StringWithAggregatesFilter<"Anime"> | string
    title_english?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    title_japanese?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    synopsis?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    background?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    type?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    source?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    episodes?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    status?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    airing?: BoolWithAggregatesFilter<"Anime"> | boolean
    aired_from?: DateTimeNullableWithAggregatesFilter<"Anime"> | Date | string | null
    aired_to?: DateTimeNullableWithAggregatesFilter<"Anime"> | Date | string | null
    duration?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    rating?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    score?: FloatNullableWithAggregatesFilter<"Anime"> | number | null
    scored_by?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    rank?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    popularity?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    members?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    favorites?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    season?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    year?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    approved?: BoolWithAggregatesFilter<"Anime"> | boolean
    broadcast_day?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    broadcast_time?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    broadcast_timezone?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    broadcast_string?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    trailer_url?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    trailer_youtube_id?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    trailer_embed_url?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    image_large_url?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    image_small_url?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"Anime"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserGameWhereInput = {
    AND?: UserGameWhereInput | UserGameWhereInput[]
    OR?: UserGameWhereInput[]
    NOT?: UserGameWhereInput | UserGameWhereInput[]
    id?: IntFilter<"UserGame"> | number
    user_id?: IntFilter<"UserGame"> | number
    game_id?: IntFilter<"UserGame"> | number
    rating?: FloatNullableFilter<"UserGame"> | number | null
    status?: StringNullableFilter<"UserGame"> | string | null
    created_at?: DateTimeFilter<"UserGame"> | Date | string
  }

  export type UserGameOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type UserGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_game_id?: UserGameUser_idGame_idCompoundUniqueInput
    AND?: UserGameWhereInput | UserGameWhereInput[]
    OR?: UserGameWhereInput[]
    NOT?: UserGameWhereInput | UserGameWhereInput[]
    user_id?: IntFilter<"UserGame"> | number
    game_id?: IntFilter<"UserGame"> | number
    rating?: FloatNullableFilter<"UserGame"> | number | null
    status?: StringNullableFilter<"UserGame"> | string | null
    created_at?: DateTimeFilter<"UserGame"> | Date | string
  }, "id" | "user_id_game_id">

  export type UserGameOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: UserGameCountOrderByAggregateInput
    _avg?: UserGameAvgOrderByAggregateInput
    _max?: UserGameMaxOrderByAggregateInput
    _min?: UserGameMinOrderByAggregateInput
    _sum?: UserGameSumOrderByAggregateInput
  }

  export type UserGameScalarWhereWithAggregatesInput = {
    AND?: UserGameScalarWhereWithAggregatesInput | UserGameScalarWhereWithAggregatesInput[]
    OR?: UserGameScalarWhereWithAggregatesInput[]
    NOT?: UserGameScalarWhereWithAggregatesInput | UserGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserGame"> | number
    user_id?: IntWithAggregatesFilter<"UserGame"> | number
    game_id?: IntWithAggregatesFilter<"UserGame"> | number
    rating?: FloatNullableWithAggregatesFilter<"UserGame"> | number | null
    status?: StringNullableWithAggregatesFilter<"UserGame"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"UserGame"> | Date | string
  }

  export type Top100GameWhereInput = {
    AND?: Top100GameWhereInput | Top100GameWhereInput[]
    OR?: Top100GameWhereInput[]
    NOT?: Top100GameWhereInput | Top100GameWhereInput[]
    id?: IntFilter<"Top100Game"> | number
    game_id?: IntFilter<"Top100Game"> | number
    rank?: IntFilter<"Top100Game"> | number
    value?: FloatNullableFilter<"Top100Game"> | number | null
    created_at?: DateTimeFilter<"Top100Game"> | Date | string
  }

  export type Top100GameOrderByWithRelationInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type Top100GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rank?: number
    AND?: Top100GameWhereInput | Top100GameWhereInput[]
    OR?: Top100GameWhereInput[]
    NOT?: Top100GameWhereInput | Top100GameWhereInput[]
    game_id?: IntFilter<"Top100Game"> | number
    value?: FloatNullableFilter<"Top100Game"> | number | null
    created_at?: DateTimeFilter<"Top100Game"> | Date | string
  }, "id" | "rank">

  export type Top100GameOrderByWithAggregationInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: Top100GameCountOrderByAggregateInput
    _avg?: Top100GameAvgOrderByAggregateInput
    _max?: Top100GameMaxOrderByAggregateInput
    _min?: Top100GameMinOrderByAggregateInput
    _sum?: Top100GameSumOrderByAggregateInput
  }

  export type Top100GameScalarWhereWithAggregatesInput = {
    AND?: Top100GameScalarWhereWithAggregatesInput | Top100GameScalarWhereWithAggregatesInput[]
    OR?: Top100GameScalarWhereWithAggregatesInput[]
    NOT?: Top100GameScalarWhereWithAggregatesInput | Top100GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Top100Game"> | number
    game_id?: IntWithAggregatesFilter<"Top100Game"> | number
    rank?: IntWithAggregatesFilter<"Top100Game"> | number
    value?: FloatNullableWithAggregatesFilter<"Top100Game"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Top100Game"> | Date | string
  }

  export type GameCreateInput = {
    slug: string
    name: string
    released?: string | null
    tba?: boolean | null
    background_image?: string | null
    rating?: number | null
    rating_top?: number | null
    ratings_count?: number | null
    reviews_text_count?: number | null
    added?: number | null
    metacritic?: number | null
    playtime?: number | null
    suggestions_count?: number | null
    updated?: string | null
    user_game?: number | null
    reviews_count?: number | null
    saturated_color?: string | null
    dominant_color?: string | null
    esrb_rating?: string | null
    description_raw?: string | null
  }

  export type GameUncheckedCreateInput = {
    id?: number
    slug: string
    name: string
    released?: string | null
    tba?: boolean | null
    background_image?: string | null
    rating?: number | null
    rating_top?: number | null
    ratings_count?: number | null
    reviews_text_count?: number | null
    added?: number | null
    metacritic?: number | null
    playtime?: number | null
    suggestions_count?: number | null
    updated?: string | null
    user_game?: number | null
    reviews_count?: number | null
    saturated_color?: string | null
    dominant_color?: string | null
    esrb_rating?: string | null
    description_raw?: string | null
  }

  export type GameUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    released?: NullableStringFieldUpdateOperationsInput | string | null
    tba?: NullableBoolFieldUpdateOperationsInput | boolean | null
    background_image?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    rating_top?: NullableIntFieldUpdateOperationsInput | number | null
    ratings_count?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_text_count?: NullableIntFieldUpdateOperationsInput | number | null
    added?: NullableIntFieldUpdateOperationsInput | number | null
    metacritic?: NullableIntFieldUpdateOperationsInput | number | null
    playtime?: NullableIntFieldUpdateOperationsInput | number | null
    suggestions_count?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableStringFieldUpdateOperationsInput | string | null
    user_game?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_count?: NullableIntFieldUpdateOperationsInput | number | null
    saturated_color?: NullableStringFieldUpdateOperationsInput | string | null
    dominant_color?: NullableStringFieldUpdateOperationsInput | string | null
    esrb_rating?: NullableStringFieldUpdateOperationsInput | string | null
    description_raw?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    released?: NullableStringFieldUpdateOperationsInput | string | null
    tba?: NullableBoolFieldUpdateOperationsInput | boolean | null
    background_image?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    rating_top?: NullableIntFieldUpdateOperationsInput | number | null
    ratings_count?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_text_count?: NullableIntFieldUpdateOperationsInput | number | null
    added?: NullableIntFieldUpdateOperationsInput | number | null
    metacritic?: NullableIntFieldUpdateOperationsInput | number | null
    playtime?: NullableIntFieldUpdateOperationsInput | number | null
    suggestions_count?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableStringFieldUpdateOperationsInput | string | null
    user_game?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_count?: NullableIntFieldUpdateOperationsInput | number | null
    saturated_color?: NullableStringFieldUpdateOperationsInput | string | null
    dominant_color?: NullableStringFieldUpdateOperationsInput | string | null
    esrb_rating?: NullableStringFieldUpdateOperationsInput | string | null
    description_raw?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameCreateManyInput = {
    id?: number
    slug: string
    name: string
    released?: string | null
    tba?: boolean | null
    background_image?: string | null
    rating?: number | null
    rating_top?: number | null
    ratings_count?: number | null
    reviews_text_count?: number | null
    added?: number | null
    metacritic?: number | null
    playtime?: number | null
    suggestions_count?: number | null
    updated?: string | null
    user_game?: number | null
    reviews_count?: number | null
    saturated_color?: string | null
    dominant_color?: string | null
    esrb_rating?: string | null
    description_raw?: string | null
  }

  export type GameUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    released?: NullableStringFieldUpdateOperationsInput | string | null
    tba?: NullableBoolFieldUpdateOperationsInput | boolean | null
    background_image?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    rating_top?: NullableIntFieldUpdateOperationsInput | number | null
    ratings_count?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_text_count?: NullableIntFieldUpdateOperationsInput | number | null
    added?: NullableIntFieldUpdateOperationsInput | number | null
    metacritic?: NullableIntFieldUpdateOperationsInput | number | null
    playtime?: NullableIntFieldUpdateOperationsInput | number | null
    suggestions_count?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableStringFieldUpdateOperationsInput | string | null
    user_game?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_count?: NullableIntFieldUpdateOperationsInput | number | null
    saturated_color?: NullableStringFieldUpdateOperationsInput | string | null
    dominant_color?: NullableStringFieldUpdateOperationsInput | string | null
    esrb_rating?: NullableStringFieldUpdateOperationsInput | string | null
    description_raw?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    released?: NullableStringFieldUpdateOperationsInput | string | null
    tba?: NullableBoolFieldUpdateOperationsInput | boolean | null
    background_image?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    rating_top?: NullableIntFieldUpdateOperationsInput | number | null
    ratings_count?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_text_count?: NullableIntFieldUpdateOperationsInput | number | null
    added?: NullableIntFieldUpdateOperationsInput | number | null
    metacritic?: NullableIntFieldUpdateOperationsInput | number | null
    playtime?: NullableIntFieldUpdateOperationsInput | number | null
    suggestions_count?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableStringFieldUpdateOperationsInput | string | null
    user_game?: NullableIntFieldUpdateOperationsInput | number | null
    reviews_count?: NullableIntFieldUpdateOperationsInput | number | null
    saturated_color?: NullableStringFieldUpdateOperationsInput | string | null
    dominant_color?: NullableStringFieldUpdateOperationsInput | string | null
    esrb_rating?: NullableStringFieldUpdateOperationsInput | string | null
    description_raw?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnimeCreateInput = {
    mal_id: number
    slug: string
    url: string
    title: string
    title_english?: string | null
    title_japanese?: string | null
    synopsis?: string | null
    background?: string | null
    type?: string | null
    source?: string | null
    episodes?: number | null
    status?: string | null
    airing: boolean
    aired_from?: Date | string | null
    aired_to?: Date | string | null
    duration?: string | null
    rating?: string | null
    score?: number | null
    scored_by?: number | null
    rank?: number | null
    popularity?: number | null
    members?: number | null
    favorites?: number | null
    season?: string | null
    year?: number | null
    approved: boolean
    broadcast_day?: string | null
    broadcast_time?: string | null
    broadcast_timezone?: string | null
    broadcast_string?: string | null
    trailer_url?: string | null
    trailer_youtube_id?: string | null
    trailer_embed_url?: string | null
    image_url?: string | null
    image_large_url?: string | null
    image_small_url?: string | null
    updated_at?: Date | string
  }

  export type AnimeUncheckedCreateInput = {
    mal_id: number
    slug: string
    url: string
    title: string
    title_english?: string | null
    title_japanese?: string | null
    synopsis?: string | null
    background?: string | null
    type?: string | null
    source?: string | null
    episodes?: number | null
    status?: string | null
    airing: boolean
    aired_from?: Date | string | null
    aired_to?: Date | string | null
    duration?: string | null
    rating?: string | null
    score?: number | null
    scored_by?: number | null
    rank?: number | null
    popularity?: number | null
    members?: number | null
    favorites?: number | null
    season?: string | null
    year?: number | null
    approved: boolean
    broadcast_day?: string | null
    broadcast_time?: string | null
    broadcast_timezone?: string | null
    broadcast_string?: string | null
    trailer_url?: string | null
    trailer_youtube_id?: string | null
    trailer_embed_url?: string | null
    image_url?: string | null
    image_large_url?: string | null
    image_small_url?: string | null
    updated_at?: Date | string
  }

  export type AnimeUpdateInput = {
    mal_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    title_english?: NullableStringFieldUpdateOperationsInput | string | null
    title_japanese?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    episodes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    airing?: BoolFieldUpdateOperationsInput | boolean
    aired_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aired_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    scored_by?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    members?: NullableIntFieldUpdateOperationsInput | number | null
    favorites?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    broadcast_day?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_time?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_timezone?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_string?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_url?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_youtube_id?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_embed_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_large_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_small_url?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeUncheckedUpdateInput = {
    mal_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    title_english?: NullableStringFieldUpdateOperationsInput | string | null
    title_japanese?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    episodes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    airing?: BoolFieldUpdateOperationsInput | boolean
    aired_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aired_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    scored_by?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    members?: NullableIntFieldUpdateOperationsInput | number | null
    favorites?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    broadcast_day?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_time?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_timezone?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_string?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_url?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_youtube_id?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_embed_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_large_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_small_url?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeCreateManyInput = {
    mal_id: number
    slug: string
    url: string
    title: string
    title_english?: string | null
    title_japanese?: string | null
    synopsis?: string | null
    background?: string | null
    type?: string | null
    source?: string | null
    episodes?: number | null
    status?: string | null
    airing: boolean
    aired_from?: Date | string | null
    aired_to?: Date | string | null
    duration?: string | null
    rating?: string | null
    score?: number | null
    scored_by?: number | null
    rank?: number | null
    popularity?: number | null
    members?: number | null
    favorites?: number | null
    season?: string | null
    year?: number | null
    approved: boolean
    broadcast_day?: string | null
    broadcast_time?: string | null
    broadcast_timezone?: string | null
    broadcast_string?: string | null
    trailer_url?: string | null
    trailer_youtube_id?: string | null
    trailer_embed_url?: string | null
    image_url?: string | null
    image_large_url?: string | null
    image_small_url?: string | null
    updated_at?: Date | string
  }

  export type AnimeUpdateManyMutationInput = {
    mal_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    title_english?: NullableStringFieldUpdateOperationsInput | string | null
    title_japanese?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    episodes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    airing?: BoolFieldUpdateOperationsInput | boolean
    aired_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aired_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    scored_by?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    members?: NullableIntFieldUpdateOperationsInput | number | null
    favorites?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    broadcast_day?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_time?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_timezone?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_string?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_url?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_youtube_id?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_embed_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_large_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_small_url?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeUncheckedUpdateManyInput = {
    mal_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    title_english?: NullableStringFieldUpdateOperationsInput | string | null
    title_japanese?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    background?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    episodes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    airing?: BoolFieldUpdateOperationsInput | boolean
    aired_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aired_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    scored_by?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableIntFieldUpdateOperationsInput | number | null
    members?: NullableIntFieldUpdateOperationsInput | number | null
    favorites?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    broadcast_day?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_time?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_timezone?: NullableStringFieldUpdateOperationsInput | string | null
    broadcast_string?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_url?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_youtube_id?: NullableStringFieldUpdateOperationsInput | string | null
    trailer_embed_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_large_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_small_url?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    email: string
    username: string
    password: string
    created_at?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    username: string
    password: string
    created_at?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    username: string
    password: string
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameCreateInput = {
    user_id: number
    game_id: number
    rating?: number | null
    status?: string | null
    created_at?: Date | string
  }

  export type UserGameUncheckedCreateInput = {
    id?: number
    user_id: number
    game_id: number
    rating?: number | null
    status?: string | null
    created_at?: Date | string
  }

  export type UserGameUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameCreateManyInput = {
    id?: number
    user_id: number
    game_id: number
    rating?: number | null
    status?: string | null
    created_at?: Date | string
  }

  export type UserGameUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Top100GameCreateInput = {
    game_id: number
    rank: number
    value?: number | null
    created_at?: Date | string
  }

  export type Top100GameUncheckedCreateInput = {
    id?: number
    game_id: number
    rank: number
    value?: number | null
    created_at?: Date | string
  }

  export type Top100GameUpdateInput = {
    game_id?: IntFieldUpdateOperationsInput | number
    rank?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Top100GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rank?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Top100GameCreateManyInput = {
    id?: number
    game_id: number
    rank: number
    value?: number | null
    created_at?: Date | string
  }

  export type Top100GameUpdateManyMutationInput = {
    game_id?: IntFieldUpdateOperationsInput | number
    rank?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Top100GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    game_id?: IntFieldUpdateOperationsInput | number
    rank?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    released?: SortOrder
    tba?: SortOrder
    background_image?: SortOrder
    rating?: SortOrder
    rating_top?: SortOrder
    ratings_count?: SortOrder
    reviews_text_count?: SortOrder
    added?: SortOrder
    metacritic?: SortOrder
    playtime?: SortOrder
    suggestions_count?: SortOrder
    updated?: SortOrder
    user_game?: SortOrder
    reviews_count?: SortOrder
    saturated_color?: SortOrder
    dominant_color?: SortOrder
    esrb_rating?: SortOrder
    description_raw?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    rating_top?: SortOrder
    ratings_count?: SortOrder
    reviews_text_count?: SortOrder
    added?: SortOrder
    metacritic?: SortOrder
    playtime?: SortOrder
    suggestions_count?: SortOrder
    user_game?: SortOrder
    reviews_count?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    released?: SortOrder
    tba?: SortOrder
    background_image?: SortOrder
    rating?: SortOrder
    rating_top?: SortOrder
    ratings_count?: SortOrder
    reviews_text_count?: SortOrder
    added?: SortOrder
    metacritic?: SortOrder
    playtime?: SortOrder
    suggestions_count?: SortOrder
    updated?: SortOrder
    user_game?: SortOrder
    reviews_count?: SortOrder
    saturated_color?: SortOrder
    dominant_color?: SortOrder
    esrb_rating?: SortOrder
    description_raw?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    released?: SortOrder
    tba?: SortOrder
    background_image?: SortOrder
    rating?: SortOrder
    rating_top?: SortOrder
    ratings_count?: SortOrder
    reviews_text_count?: SortOrder
    added?: SortOrder
    metacritic?: SortOrder
    playtime?: SortOrder
    suggestions_count?: SortOrder
    updated?: SortOrder
    user_game?: SortOrder
    reviews_count?: SortOrder
    saturated_color?: SortOrder
    dominant_color?: SortOrder
    esrb_rating?: SortOrder
    description_raw?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    rating_top?: SortOrder
    ratings_count?: SortOrder
    reviews_text_count?: SortOrder
    added?: SortOrder
    metacritic?: SortOrder
    playtime?: SortOrder
    suggestions_count?: SortOrder
    user_game?: SortOrder
    reviews_count?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AnimeCountOrderByAggregateInput = {
    mal_id?: SortOrder
    slug?: SortOrder
    url?: SortOrder
    title?: SortOrder
    title_english?: SortOrder
    title_japanese?: SortOrder
    synopsis?: SortOrder
    background?: SortOrder
    type?: SortOrder
    source?: SortOrder
    episodes?: SortOrder
    status?: SortOrder
    airing?: SortOrder
    aired_from?: SortOrder
    aired_to?: SortOrder
    duration?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    scored_by?: SortOrder
    rank?: SortOrder
    popularity?: SortOrder
    members?: SortOrder
    favorites?: SortOrder
    season?: SortOrder
    year?: SortOrder
    approved?: SortOrder
    broadcast_day?: SortOrder
    broadcast_time?: SortOrder
    broadcast_timezone?: SortOrder
    broadcast_string?: SortOrder
    trailer_url?: SortOrder
    trailer_youtube_id?: SortOrder
    trailer_embed_url?: SortOrder
    image_url?: SortOrder
    image_large_url?: SortOrder
    image_small_url?: SortOrder
    updated_at?: SortOrder
  }

  export type AnimeAvgOrderByAggregateInput = {
    mal_id?: SortOrder
    episodes?: SortOrder
    score?: SortOrder
    scored_by?: SortOrder
    rank?: SortOrder
    popularity?: SortOrder
    members?: SortOrder
    favorites?: SortOrder
    year?: SortOrder
  }

  export type AnimeMaxOrderByAggregateInput = {
    mal_id?: SortOrder
    slug?: SortOrder
    url?: SortOrder
    title?: SortOrder
    title_english?: SortOrder
    title_japanese?: SortOrder
    synopsis?: SortOrder
    background?: SortOrder
    type?: SortOrder
    source?: SortOrder
    episodes?: SortOrder
    status?: SortOrder
    airing?: SortOrder
    aired_from?: SortOrder
    aired_to?: SortOrder
    duration?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    scored_by?: SortOrder
    rank?: SortOrder
    popularity?: SortOrder
    members?: SortOrder
    favorites?: SortOrder
    season?: SortOrder
    year?: SortOrder
    approved?: SortOrder
    broadcast_day?: SortOrder
    broadcast_time?: SortOrder
    broadcast_timezone?: SortOrder
    broadcast_string?: SortOrder
    trailer_url?: SortOrder
    trailer_youtube_id?: SortOrder
    trailer_embed_url?: SortOrder
    image_url?: SortOrder
    image_large_url?: SortOrder
    image_small_url?: SortOrder
    updated_at?: SortOrder
  }

  export type AnimeMinOrderByAggregateInput = {
    mal_id?: SortOrder
    slug?: SortOrder
    url?: SortOrder
    title?: SortOrder
    title_english?: SortOrder
    title_japanese?: SortOrder
    synopsis?: SortOrder
    background?: SortOrder
    type?: SortOrder
    source?: SortOrder
    episodes?: SortOrder
    status?: SortOrder
    airing?: SortOrder
    aired_from?: SortOrder
    aired_to?: SortOrder
    duration?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    scored_by?: SortOrder
    rank?: SortOrder
    popularity?: SortOrder
    members?: SortOrder
    favorites?: SortOrder
    season?: SortOrder
    year?: SortOrder
    approved?: SortOrder
    broadcast_day?: SortOrder
    broadcast_time?: SortOrder
    broadcast_timezone?: SortOrder
    broadcast_string?: SortOrder
    trailer_url?: SortOrder
    trailer_youtube_id?: SortOrder
    trailer_embed_url?: SortOrder
    image_url?: SortOrder
    image_large_url?: SortOrder
    image_small_url?: SortOrder
    updated_at?: SortOrder
  }

  export type AnimeSumOrderByAggregateInput = {
    mal_id?: SortOrder
    episodes?: SortOrder
    score?: SortOrder
    scored_by?: SortOrder
    rank?: SortOrder
    popularity?: SortOrder
    members?: SortOrder
    favorites?: SortOrder
    year?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserGameUser_idGame_idCompoundUniqueInput = {
    user_id: number
    game_id: number
  }

  export type UserGameCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type UserGameAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrder
  }

  export type UserGameMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type UserGameMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type UserGameSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    game_id?: SortOrder
    rating?: SortOrder
  }

  export type Top100GameCountOrderByAggregateInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrder
    created_at?: SortOrder
  }

  export type Top100GameAvgOrderByAggregateInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrder
  }

  export type Top100GameMaxOrderByAggregateInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrder
    created_at?: SortOrder
  }

  export type Top100GameMinOrderByAggregateInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrder
    created_at?: SortOrder
  }

  export type Top100GameSumOrderByAggregateInput = {
    id?: SortOrder
    game_id?: SortOrder
    rank?: SortOrder
    value?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}