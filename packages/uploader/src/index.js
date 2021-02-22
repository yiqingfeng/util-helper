import { uploadFiles } from './uploader';

const $uploader = document.querySelector('.m-uploader');
const $input = document.querySelector('.uploader-input');

$uploader.addEventListener('click', function () {
    $input.value = null;
    $input.click();
});

$input.addEventListener('change', function (e) {
    const files = e.target.files;

    if (!files) return;

    console.log(files);
    uploadFiles(files);
});
