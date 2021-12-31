import InstrumentDictionary from "../../dictionaries/InstrumentDictionary"

const InstrumentNameReturn = (instrument_id) => Object.values(InstrumentDictionary)[instrument_id]

// function InstrumentNameReturn(inst_id) {
//   // const InstrumentNames = (instrument_id) => Object.values(InstrumentDictionary)[instrument_id]
//   // return (InstrumentNames(inst_id));
// return Object.values(InstrumentDictionary)[inst_id]
// }

export default InstrumentNameReturn;