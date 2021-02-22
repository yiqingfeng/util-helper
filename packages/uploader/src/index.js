import { uploadFiles } from './uploader';

const $uploader = document.querySelector('.uploader-upload-file');
const $input = document.querySelector('.uploader-input');
const $text = document.querySelector('.uploader-text');

$uploader.addEventListener('click', () => {
    $input.value = null;
    $input.click();
});

$input.addEventListener('change', (e) => {
    const { files } = e.target;

    if (!files) return;

    uploadFiles(files, {
        whenChunks: 2097152,
        events: {
            progress(event) {
                $text.innerHTML = `${event.percent || 0}%`;
            },
            success(res) {
                console.log(res);
            },
            error(err) {
                console.log(err);
            }
        }
    });
});
