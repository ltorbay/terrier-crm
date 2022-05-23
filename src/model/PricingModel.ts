export interface PricingLine {
    nightly: number,
    weekly: number
}

export interface PricingModel {
    both: PricingLine,
    grape: PricingLine,
    pear: PricingLine
}