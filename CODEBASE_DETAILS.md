# Nest Project Codebase Details

This project is a small NestJS application. It currently has one implemented HTTP controller and one implemented service.

The main runtime path is:

1. `src/main.ts` starts the application.
2. `src/app.module.ts` tells Nest which controllers and providers belong to the app.
3. `src/app.controller.ts` receives HTTP requests.
4. `src/app.service.ts` contains the logic used by the controller.
5. Test files verify the controller and HTTP behavior.

## Runtime Flow

When the app starts, the execution order is:

```text
npm run start / npm run start:dev
        |
        v
src/main.ts
        |
        v
NestFactory.create(AppModule)
        |
        v
src/app.module.ts
        |
        v
Nest reads module metadata
        |
        v
Nest creates registered providers and controllers
        |
        v
HTTP server listens on process.env.PORT or 3000
```

The implemented request flow is:

```text
GET /
 |
 v
AppController.getHello()
 |
 v
AppService.getHello()
 |
 v
"Hello nestjs!"
```

There is no `/welcome` route in the current codebase. The active app currently exposes only the root `GET /` route.

## Source Files

### `src/main.ts`

Purpose: application entry point.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

Dependencies:

- `@nestjs/core`: provides `NestFactory`.
- `./app.module`: imports the root module.

What it does:

- Creates a Nest application from `AppModule`.
- Starts the HTTP server.
- Uses `process.env.PORT` when available.
- Uses port `3000` by default.

Precedence:

- This is the first application file that runs.
- It depends on `AppModule`.
- Controllers and services are not created until this file passes `AppModule` to Nest.

### `src/app.module.ts`

Purpose: root application module.

Current code:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Dependencies:

- `@nestjs/common`: provides the `@Module()` decorator.
- `./app.controller`: provides `AppController`.
- `./app.service`: provides `AppService`.

What it should do:

- `imports`: register other Nest modules. Empty right now.
- `controllers`: register classes that handle HTTP routes.
- `providers`: register injectable service classes.

Current status:

- `AppController` exists and is registered.
- `AppService` exists and is registered.
- The module is currently in sync with the controller and service files.

Precedence:

- `main.ts` loads `AppModule`.
- Nest reads `AppModule` before creating controllers and providers.
- If a class listed in `controllers` or `providers` cannot be imported, the app fails before the HTTP server can start.

### `src/app.controller.ts`

Purpose: defines HTTP request handlers.

Current code:

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

Dependencies:

- `@nestjs/common`: provides `@Controller()` and `@Get()`.
- `./app.service`: provides `AppService`.

Implemented route:

- `@Controller()` has no path prefix.
- `@Get()` has no route path.
- Final endpoint: `GET /`.

How it works:

- Nest creates `AppController`.
- Nest injects `AppService` into the constructor.
- When a request hits `GET /`, Nest calls `getHello()`.
- `getHello()` calls `this.appService.getHello()`.
- The returned string becomes the HTTP response body.

Precedence:

- `AppController` depends on `AppService`.
- The controller should stay focused on HTTP routing.
- The service should hold reusable logic.

### `src/app.service.ts`

Purpose: contains reusable application logic.

Current code:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello nestjs!';
  }
}
```

Dependencies:

- `@nestjs/common`: provides `@Injectable()`.

What it does:

- Marks `AppService` as a Nest injectable provider.
- Allows Nest to inject it into `AppController`.
- Returns the text used by `GET /`.

Precedence:

- `AppService` is registered in `AppModule.providers`.
- `AppController` receives it through dependency injection.
- `AppService` does not depend on the controller.

## Test Files

### `src/app.controller.spec.ts`

Purpose: unit test for `AppController`.

Current test:

```ts
expect(appController.getHello()).toBe('Hello World!');
```

Dependencies:

- `@nestjs/testing`: provides `Test` and `TestingModule`.
- `./app.controller`: provides `AppController`.
- `./app.service`: provides `AppService`.

How it works:

1. Creates a testing module.
2. Registers `AppController`.
3. Registers `AppService`.
4. Gets an `AppController` instance from the test module.
5. Calls `appController.getHello()` directly.

Current issue:

- `AppService.getHello()` returns `"Hello nestjs!"`.
- The unit test expects `"Hello World!"`.
- After the compile errors are fixed, this test will fail unless the expected value is changed or the service return value is changed.

### `test/app.e2e-spec.ts`

Purpose: end-to-end test for the full HTTP app.

Current assertion:

```ts
request(app.getHttpServer())
  .get('/')
  .expect(200)
  .expect('Hello World!');
```

Dependencies:

- `@nestjs/testing`: creates a Nest testing module.
- `@nestjs/common`: provides `INestApplication`.
- `supertest`: sends HTTP requests to the in-memory server.
- `../src/app.module`: imports the full app module.

How it works:

1. Creates a test module with `AppModule`.
2. Creates a Nest application from that module.
3. Starts the app in memory with `app.init()`.
4. Sends `GET /` through `supertest`.
5. Checks the HTTP status and response body.

Current issue:

- The implemented response is `"Hello nestjs!"`.
- The e2e test expects `"Hello World!"`.
- This test imports the full `AppModule`, which now builds correctly.

## Config Files

### `package.json`

Purpose: project metadata, dependencies, and scripts.

Important scripts:

- `npm run build`: compiles the app into `dist`.
- `npm run start`: starts the app once.
- `npm run start:dev`: starts the app in watch mode.
- `npm run start:debug`: starts the app in debug watch mode.
- `npm run start:prod`: runs the compiled app from `dist/main`.
- `npm run test`: runs unit tests.
- `npm run test:e2e`: runs end-to-end tests.
- `npm run test:cov`: runs tests with coverage.
- `npm run lint`: runs ESLint with auto-fix.
- `npm run format`: formats source and test files with Prettier.

Runtime dependencies:

- `@nestjs/common`: common decorators and Nest utilities.
- `@nestjs/core`: Nest runtime and application factory.
- `@nestjs/platform-express`: Express HTTP adapter for Nest.
- `reflect-metadata`: decorator metadata support.
- `rxjs`: reactive library used by Nest.

Development dependencies:

- `@nestjs/cli`: Nest CLI commands such as build and start.
- `@nestjs/testing`: Nest testing helpers.
- `jest` and `ts-jest`: test runner and TypeScript test transform.
- `typescript`, `ts-node`, `ts-loader`: TypeScript tooling.
- `eslint` and `prettier`: linting and formatting.
- `supertest`: HTTP request testing.

### `nest-cli.json`

Purpose: Nest CLI configuration.

Important values:

- `sourceRoot: "src"` means Nest treats `src` as the application source folder.
- `deleteOutDir: true` means the build output is cleaned before new files are emitted.

### `tsconfig.json`

Purpose: TypeScript compiler configuration.

Important values:

- `target: "ES2023"`: uses modern JavaScript output.
- `module: "nodenext"` and `moduleResolution: "nodenext"`: use Node-style module behavior.
- `experimentalDecorators: true`: required for decorators like `@Controller()`.
- `emitDecoratorMetadata: true`: supports Nest dependency injection metadata.
- `outDir: "./dist"`: compiled output goes to `dist`.
- `strictNullChecks: true`: catches null and undefined mistakes.

### `tsconfig.build.json`

Purpose: build-specific TypeScript configuration.

It extends `tsconfig.json` and excludes:

- `node_modules`
- `test`
- `dist`
- `**/*spec.ts`

This keeps tests and generated files out of the production build.

### `eslint.config.mjs`

Purpose: ESLint configuration.

It enables:

- JavaScript recommended rules.
- TypeScript checked rules.
- Prettier integration.
- Node and Jest globals.

Notable rules:

- `@typescript-eslint/no-explicit-any`: off.
- `@typescript-eslint/no-floating-promises`: warning.
- `@typescript-eslint/no-unsafe-argument`: warning.
- `prettier/prettier`: error with automatic line ending handling.

### `.prettierrc`

Purpose: Prettier formatting rules.

Current settings:

- Single quotes.
- Trailing commas.

### `.gitignore`

Purpose: prevents generated files, dependency folders, local environment files, logs, and editor files from being committed.

Important ignored paths:

- `dist`
- `node_modules`
- `coverage`
- `.env` files
- logs
- temporary files
- editor metadata

## Dependency Map

Current implemented dependencies:

```text
main.ts
  depends on AppModule

AppModule
  depends on AppController
  depends on AppService

AppController
  depends on AppService

AppService
  depends on @nestjs/common
```

## Precedence Summary

### Startup precedence

1. `main.ts` runs.
2. `main.ts` imports `AppModule`.
3. TypeScript/Nest resolves imports used by `AppModule`.
4. `AppModule` registers controllers and providers.
5. Nest creates provider instances.
6. Nest creates controller instances and injects providers.
7. Nest starts the HTTP server.

At the moment, startup/build succeeds for the implemented app structure.

### Request precedence

For the implemented root route:

1. Client sends `GET /`.
2. Nest matches the request to `AppController.getHello()`.
3. `AppController.getHello()` calls `AppService.getHello()`.
4. `AppService.getHello()` returns `"Hello nestjs!"`.
5. Nest sends that value as the HTTP response.

### Test precedence

Unit test:

1. Jest starts.
2. `app.controller.spec.ts` creates a testing module.
3. The testing module registers `AppController` and `AppService`.
4. The test gets `AppController`.
5. The test calls `getHello()` directly.
6. The test compares the result with `"Hello World!"`.

E2E test:

1. Jest starts with `test/jest-e2e.json`.
2. The test creates a module using `AppModule`.
3. The test creates a Nest application.
4. `supertest` sends `GET /`.
5. The test expects status `200` and body `"Hello World!"`.

## Current Problems To Fix

1. Unit test expects the wrong response.

   File affected:

   - `src/app.controller.spec.ts`

   Current app response:

   ```text
   Hello nestjs!
   ```

   Current test expectation:

   ```text
   Hello World!
   ```

2. E2E test expects the wrong response.

   File affected:

   - `test/app.e2e-spec.ts`

   Current app response:

   ```text
   Hello nestjs!
   ```

   Current test expectation:

   ```text
   Hello World!
   ```

## Suggested Clean Structure Going Forward

If this app grows, put each feature in its own folder:

```text
src/
  main.ts
  app.module.ts
  hello/
    hello.module.ts
    hello.controller.ts
    hello.service.ts
    hello.controller.spec.ts
  welcome/Using 
    welcome.module.ts
    welcome.controller.ts
    welcome.service.ts
    welcome.controller.spec.ts
```

