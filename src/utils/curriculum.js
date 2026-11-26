const numberFormatter = new Intl.NumberFormat('es-MX')

/** Format numeric totals using Mexican Spanish locale grouping. */
export const formatNumber = (value) => numberFormatter.format(value)

/** Count total subjects across all curriculum cycles. */
export const getTotalSubjects = (cycles = []) =>
  cycles.reduce((total, cycle) => total + cycle.subjects.length, 0)

/** Sum instructor-led (HD) and independent (HI) hours for a single cycle. */
export const getCycleHours = (cycle) =>
  cycle.subjects.reduce(
    (totals, subject) => ({
      hd: totals.hd + subject.hoursWithInstructor,
      hi: totals.hi + subject.independentHours,
    }),
    { hd: 0, hi: 0 },
  )
