export enum MetaType {
    controller = '@Controller',
    module = '@Module',
    guard = '@Guard',
    provider = '@Provider',
    application = '@Application',
    app_pipeline = '@AppPipeline',
}

export const metaTypeKey = '$meta.type';