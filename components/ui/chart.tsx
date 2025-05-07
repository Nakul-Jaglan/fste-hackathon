export const Chart = ({ children }) => {
  return <div className="chart">{children}</div>
}

export const ChartLine = ({ dataKey, stroke }) => {
  return <div className="chart-line" data-key={dataKey} style={{ stroke }}></div>
}

export const ChartContainer = ({ children }) => {
  return <div className="chart-container">{children}</div>
}

export const ChartLegend = () => {
  return <div className="chart-legend"></div>
}

export const ChartTooltip = () => {
  return <div className="chart-tooltip"></div>
}
