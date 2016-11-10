declare class TKPlatformFeedbackSource {
    public static alloc(): TKPlatformFeedbackSource;
    public initWithKeyUid(apiKey, uid);
}

declare class TKFeedback {
    public static showFeedback(): void;
    public static setDataSource(source: TKPlatformFeedbackSource): void;
}