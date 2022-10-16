export type PricingPeriodType = 'OFF_SEASON' | 'PEAK_SEASON' | 'MID_SEASON';
export type PeriodKeys = 'common.mid-season' | 'common.off-season' | 'common.peak-season' | '';

export function seasonKey(seasonType: PricingPeriodType): PeriodKeys {
    switch (seasonType) {
        case "OFF_SEASON":
            return 'common.off-season';
        case "PEAK_SEASON":
            return 'common.peak-season';
        case "MID_SEASON":
            return 'common.mid-season';
        default:
            return '';
    }
}