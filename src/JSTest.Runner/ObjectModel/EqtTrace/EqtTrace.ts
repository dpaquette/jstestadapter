import { IDebugLogger } from './IDebugLogger';

export namespace EqtTrace {
    let logger: IDebugLogger;
    let debuggerInitialized: boolean = false;
    
    const writeLog = (prefix: string, moduleName: string, message: string) => {
        if (debuggerInitialized) {
            logger.log(moduleName, `${prefix}: ${message}`);
        }
    };

    export const initializeTracer = (debugLogger: IDebugLogger) => {
        if (debugLogger) {
            debuggerInitialized = true;
            logger = debugLogger;
        }
    };

    export const error = (moduleName: string, message: string) => {
        writeLog('Error', moduleName, message);
    };
    
    export const info = (moduleName: string, message: string) => {
        writeLog('Informational', moduleName, message);
    };
    
    export const warn = (moduleName: string, message: string) => {
        writeLog('Warning', moduleName, message);
    };

    export const verbose = (moduleName: string, message: string) => {
        writeLog('Verbose', moduleName, message);
    };
}