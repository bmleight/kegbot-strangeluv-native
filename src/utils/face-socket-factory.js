const proto = require('../utils/messages_pb.js');

const internals = {};

module.exports = () => {

    // const ws = new WebSocket('ws://192.168.86.44:4664/');
    const ws = new WebSocket('ws://192.168.2.126:4664/');

    ws.onopen = internals.onopen;
    ws.onmessage = internals.onmessage;
    ws.onerror = internals.onerror;
    ws.onclose = internals.onclose;

    return ws;
};

// module.exports = new WebSocket('ws://192.168.86.44:4664/');
//
// const ws = module.exports;
//
// internals.onopen = () => {
//     // connection opened
//     // ws.send('something'); // send a message
//     console.warn('on open');
//     const message = new proto.AiyBound();
//     const sc = new proto.StreamControl();
//     sc.setEnabled(true);
//     message.setStreamControl(sc);
//     ws.send(message.serializeBinary());
// };
//
// internals.onmessage = (event) => {
//
//     const message = proto.ClientBound.deserializeBinary(event.data);
//     switch (message.getMessageCase()) {
//         case proto.ClientBound.MessageCase.STREAM_DATA:
//             handle_stream_data(message.getStreamData());
//             break;
//         default:
//             break;
//     }
// };
//
// internals.onerror = (e) => {
//     // an error occurred
//     console.warn('on error');
//     console.warn(e.message);
//     console.warn(e);
// };
//
// internals.onclose = (e) => {
//     // connection closed
//     console.warn('on close');
//     console.warn(e.code, e.reason);
// };
//
// const handle_stream_data = (data) => {
//
//     switch (data.getTypeCase()) {
//         case proto.StreamData.TypeCase.CODEC_DATA:
//             handle_codec_data(data.getCodecData());
//             // console.warn('CODEC_DATA');
//             break;
//         case proto.StreamData.TypeCase.FRAME_DATA:
//             handle_frame_data(data.getFrameData());
//             // console.warn('FRAME_DATA');
//             break;
//         case proto.StreamData.TypeCase.INFERENCE_DATA:
//             handle_inference_data(data.getInferenceData());
//             // console.warn('INFERENCE_DATA');
//             break;
//         default:
//             break;
//     }
// };
//
// const handle_codec_data = (data) => {
//
//     const sps_pps = data.getData_asU8();
//     console.warn('Codec data: ' + data.getWidth() + 'x' + data.getHeight());
//     // g_player.decode(sps_pps);
// }
//
// const handle_frame_data = (data) => {
//
//     // g_player.decode(data.getData_asU8());
//
//     const new_seq = data.getSeq();
//     const prev_seq = g_last_frame_seq;
//     g_last_frame_seq = new_seq;
//     if (prev_seq > 0) {
//         const dropped = new_seq - prev_seq - 1;
//         if (dropped) {
//             console.warn('Dropped ' + dropped + ' frames');
//         }
//     }
// }
//
// const handle_inference_data = (data) => {
//
//     if (!g_canvas || !g_frame_count) {
//         return;
//     }
// }
