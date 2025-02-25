# jstestadapter2

jstestadapter2 is a JavaScript test adapter extension for [Visual Studio Test Platform](https://github.com/Microsoft/vstest). jstest with vstest can be used as a command line tool to run tests written in mocha, jasmine or jest.

> This fork addresses a path related bug when using jstestadapter with jest V29. There is no planed maintenance beyond this one bug fix.

### Install

```bash
npm install --save-dev jstestadapter2
```

### Usage

```bash
# Testing with default test framework, Jasmine
path/to/vstest.console.exe --TestAdapterPath:./node_modules/jstestadapter2/ path/to/test.1.js path/to/test.2.js

# Testing with Mocha
path/to/vstest.console.exe --TestAdapterPath:./node_modules/jstestadapter2/ path/to/test.1.js path/to/test.2.js -- JSTest.TestFramework=Mocha

# Running tests with jest
path/to/vstest.console.exe --TestAdapterPath:./node_modules/jstestadapter2/ path/to/package.json -- JSTest.TestFramework=Jest
```

### RunSettings Configuration

Option                  |  Usage                                                                                | Default
----------------------- | ------------------------------------------------------------------------------------- | --------
TestFramework           | One of the following test frameworks for execution: Jasmine/Mocha/Jest                | Jasmine
RunInDomain             | Run JavaScript tests in a node [Domain](https://nodejs.org/api/domain.html). _Note: If set to false the test must complete all execution before returning control. i.e. all callbacks such as setTimeout must be completed before the test completes execution._ | true
DebugLogs               | Enable debug logs for JavaScript test runner                                          | false
DebugFilePath           | Path for diagnostic logs                                                              | ""
TestFrameworkConfigJson | Override test framework configurations (Specific to the testframework) in json format | {}
NodeModulesPath         | Custom path to node_modules                                                           | ""

#### RunSettings can be provided through the the vstest cli itself

```bash
vstest.console.exe --Isolation --TestAdapterPath:<path> <files> -- JSTest.DebugLogs=true JSTest.TestFramework=mocha
```

#### Using RunSettings xml defined for vstest

```bash
vstest.console.exe --Settings:RunSettings.xml --TestAdapterPath:<path> <files>
```

With RunSettings.xml:

```xml
<RunSettings>
    <JSTest>
        <TestFramework>mocha</TestFramework>
        <TestFrameworkConfigJson>{
            "timeout": 60000,
            "slow": 30000
        }</TestFrameworkConfigJson>
        <DebugLogs>true</DebugLogs>
    </JSTest>
</RunSettings>
```

#### Test result attachment support

For uploading test result attachments along with tests checkout [karanjitsingh/jstestcontext](https://github.com/karanjitsingh/jstestcontext)

### Building from source

```bash
# Build binaries and javascript to `./artifacts/Debug/net451/` along with the package tarball in `./artifacts/Debug`
.\scripts\build.ps1
```

#### Build Options

| Option         | Value                  | Description                        | Default |
| -------------- | ---------------------- | ---------------------------------- | ------- |
| -clean         |                        | Clean built output                 | false   |
| -nolint        |                        | Build without tslint pass          | false   |
| -configuration | Debug, Release         | Build configuration                | Debug   |
| -target        | net451, netstandard1.4 | Platform for building managed code | net451  |

#### Running Tests

```bash
# Self dogfooding jstest javascript tests
.\test.ps1 -vstest \path\to\vstest.console.exe
```

#### Test run options

| Option         | Value                              | Description                             | Default |
| -------------- | ---------------------------------- | --------------------------------------- | ------- |
| -runonly       |                                    | Run tests without building              | false   |
| -parallel      |                                    | Enable run tests in parallel for vstest | false   |
| -discover      |                                    | Enable --listtests option in vstest     | false   |
| -configuration | Debug, Release                     | Build configuration                     | Debug   |
| -log           | \path\to\log                       | Will enable vstest diagnostic logs      | -       |
| -test          | "test filter"                      | Test filter                             | -       |
| -vstest        | \path\to\custom\vstest.console.exe | Path to vstest.console.exe              | D:\vstest\artifacts\Debug\net451\win7-x64\vstest.console.exe  |

---
