export function mapWeatherData (data) {
  let parsedData = []
  parsedData = data.map(obj => {
    return {
      'date': getFormattedDate(obj.time, obj.timezone),
      'icon': getIcon(obj.cloudCover)
    }
  })
  return parsedData
}

function getIcon (clouds) {
  let icon = '../images/clear-night.png'
  if (clouds > 0.30 && clouds < 0.60) {
    icon = '../images/partial-cloud.png'
  } else if (clouds >= 0.60) {
    icon = '../images/overcast.png'
  }
  return icon
}

function getFormattedDate (unixTime, timezone) {
  const dateObj = new Date(unixTime * 1000)
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timezone: timezone
  }).format(dateObj)
  return formattedDate
}