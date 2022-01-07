const EventAddress = (event) => {
  let baseGoogleMapsURL = "https://www.google.com/maps/place/"
  let eventAddress = `${event.address1}+${event.city}+${event.state}+${event.zip_code}`
  let eventAddressString = `${baseGoogleMapsURL}${eventAddress}`
  return eventAddressString
}

export default EventAddress 