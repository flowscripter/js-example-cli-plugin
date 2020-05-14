/* eslint-disable max-classes-per-file */

import {
    STDOUT_PRINTER_SERVICE,
    COMMAND_FACTORY_PLUGIN_EXTENSION_POINT_ID
} from '@flowscripter/cli-framework';

export class ExampleCliPluginCommandFactory {

    // eslint-disable-next-line class-methods-use-this
    getCommands() {
        return [
            {
                name: 'cow',
                description: 'The cow version of the classic example',
                options: [{
                    name: 'subject',
                    defaultValue: 'world',
                    description: 'Who to greet',
                    shortAlias: 's',
                    isOptional: true
                }],
                positionals: [],
                run: async (commandArgs, context) => {
                    // eslint-disable-next-line max-len
                    const printer = context.serviceRegistry.getServiceById(STDOUT_PRINTER_SERVICE);
                    if (printer == null) {
                        throw new Error('STDOUT_PRINTER_SERVICE not available in context');
                    }
                    printer.info(`Moo ${commandArgs.subject}\n`);
                }
            }
        ];
    }
}

class CommandFactoryExtensionFactory {
    // eslint-disable-next-line class-methods-use-this
    create() {
        return Promise.resolve(new ExampleCliPluginCommandFactory());
    }
}

export class ExampleCliPluginExtensionDescriptor {

    constructor() {
        this.extensionPointId = COMMAND_FACTORY_PLUGIN_EXTENSION_POINT_ID;

        this.factory = new CommandFactoryExtensionFactory();

        this.extensionData = 'Example CLI Plugin Extension Descriptor data';
    }
}

export default class ExampleCliPlugin {

    constructor() {
        this.extensionDescriptors = [
            new ExampleCliPluginExtensionDescriptor()
        ];

        this.pluginData = 'Example CLI Plugin data';
    }
}
