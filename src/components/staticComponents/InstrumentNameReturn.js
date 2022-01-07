import InstrumentDictionary from "../../dictionaries/InstrumentDictionary"

const InstrumentNameReturn = (instrument_id) => {
  return InstrumentDictionary[instrument_id]
}
export default InstrumentNameReturn;

// return Object.values(InstrumentDictionary)[instrument_id-1] // need to subtract 1 to adjust the array from starting at the zeroth index