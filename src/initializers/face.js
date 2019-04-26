const proto = require('../utils/messages_pb.js');

const g_canvas = null;
const g_player = null;
let g_last_frame_seq = null;
const g_frame_count = 0;

module.exports = (store) => {

    const ws = new WebSocket('ws://192.168.86.44:4664/');
    // const ws = new WebSocket('ws://192.168.2.126:4664/');

    ws.onopen = () => {
        // connection opened
        // ws.send('something'); // send a message
        console.warn('on open');
        const message = new proto.AiyBound();
        const sc = new proto.StreamControl();
        sc.setEnabled(true);
        message.setStreamControl(sc);
        ws.send(message.serializeBinary());
    };

    ws.onmessage = (event) => {

        const message = proto.ClientBound.deserializeBinary(event.data);
        switch (message.getMessageCase()) {
            case proto.ClientBound.MessageCase.STREAM_DATA:
                handle_stream_data(message.getStreamData());
                // console.warn(message.getStreamData());
                break;
            default:
                break;
        }
        // console.warn(message);
        // a message was received
        // console.warn('on message');
        // console.warn(e.data);
        // console.log(e.data);
    };

    const handle_stream_data = (data) => {

        switch (data.getTypeCase()) {
            case proto.StreamData.TypeCase.CODEC_DATA:
                handle_codec_data(data.getCodecData());
                // console.warn('CODEC_DATA');
                break;
            case proto.StreamData.TypeCase.FRAME_DATA:
                handle_frame_data(data.getFrameData());
                // console.warn('FRAME_DATA');
                break;
            case proto.StreamData.TypeCase.INFERENCE_DATA:
                handle_inference_data(data.getInferenceData());
                // console.warn('INFERENCE_DATA');
                break;
            default:
                break;
        }
    };

    const handle_codec_data = (data) => {

        // if (g_player === null) {
        //
        //     g_player = new Player({
        //         useWorker: true,
        //         workerFile: 'broadway/Decoder.js',
        //         reuseMemory: true,
        //         webgl: 'auto',
        //         size: {
        //             width: data.getWidth(),
        //             height: data.getHeight(),
        //         }
        //     });
        //
        //     g_player.onPictureDecoded = (data) => {
        //
        //         if (!g_frame_count) {
        //             console.log("First frame decoded");
        //         }
        //         g_frame_count++;
        //     };
        //
        //     const crop_div = document.createElement("div");
        //     crop_div.style.overflow = "hidden";
        //     crop_div.style.position = "absolute";
        //     crop_div.style.width = data.getWidth() + "px";
        //     crop_div.style.height = data.getHeight() + "px";
        //     crop_div.appendChild(g_player.canvas);
        //     g_container.appendChild(crop_div);
        //
        //     g_canvas = document.createElement("canvas");
        //     g_canvas.style.position = "absolute";
        //     g_canvas.width = data.getWidth();
        //     g_canvas.height = data.getHeight();
        //     g_container.appendChild(g_canvas);
        //
        //     const license_link = document.createElement("a");
        //     license_link.appendChild(document.createTextNode("Open source licenses"));
        //     license_link.title = "LICENSE";
        //     license_link.href = "broadway/LICENSE";
        //     license_link.target= "_blank";
        //     license_link.style.position = "relative";
        //     license_link.style.top = data.getHeight() + "px";
        //     g_container.appendChild(license_link);
        // }

        const sps_pps = data.getData_asU8();
        console.warn('Codec data: ' + data.getWidth() + 'x' + data.getHeight());
        // g_player.decode(sps_pps);
    }

    const handle_frame_data = (data) => {

        // g_player.decode(data.getData_asU8());

        const new_seq = data.getSeq();
        const prev_seq = g_last_frame_seq;
        g_last_frame_seq = new_seq;
        if (prev_seq > 0) {
            const dropped = new_seq - prev_seq - 1;
            if (dropped) {
                console.warn('Dropped ' + dropped + ' frames');
            }
        }
    }

    const handle_inference_data = (data) => {

        if (!g_canvas || !g_frame_count) {
            return;
        }

        // const ctx = g_canvas.getContext("2d");
        // const width = g_canvas.width;
        // const height = g_canvas.height;
        // ctx.clearRect(0, 0, width, height);
        //
        // const list = data.getElementsList();
        // const len = list.length;
        // for (let i = 0; i < len; i++) {
        //     ctx.save();
        //     const element = list[i];
        //     switch (element.getElementCase()) {
        //         case proto.InferenceElement.ElementCase.RECTANGLE:
        //             draw_rectangle(ctx, width, height, element.getRectangle());
        //             break;
        //         case proto.InferenceElement.ElementCase.LABEL:
        //             draw_label(ctx, width, height, element.getLabel());
        //             break;
        //         default:
        //             // Ignore.
        //             break;
        //     }
        //     ctx.restore();
        // }
    }

    ws.onerror = (e) => {
        // an error occurred
        console.warn('on error');
        console.warn(e.message);
        console.warn(e);
    };

    ws.onclose = (e) => {
        // connection closed
        console.warn('on close');
        console.warn(e.code, e.reason);
    };

    // Connection opened
    // ws.addEventListener('open', (event) => {
    //
    //     // ws.send('Hello Server!');
    // });

    // Listen for messages
    // ws.addEventListener('message', (event) => {
    //
    //     console.warn('Message from server ', event.data);
    // });
};
