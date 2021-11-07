(() => {
    [...document.querySelectorAll('.box-link')].map($e => {
        $e.addEventListener ('click',() => {
            const preId = GridUi.dataSetValue($e, 'preBox');
            const $pre  = document.querySelector('pre[data-pre-box="' + preId + '"]');
            const $txtContainer = $e.querySelector('[data-translate]');
            const linkTxt = (GridUi.dataSetValue($e, 'linkTxt'))
                ? GridUi.dataSetValue($e, 'linkTxt') .split(',') : [];
            const translate = (GridUi.dataSetValue($e, 'linkTranslate'))
                ? GridUi.dataSetValue($e, 'linkTranslate') .split(',') : [];
            let isOpen = ($pre.classList.contains('box-open'));
            $txtContainer.dataset.translate = translate[(isOpen ? 0 : 1)];
            $txtContainer.innerText = linkTxt[(isOpen ? 0 : 1)];

            ($pre.classList.contains('box-open'))
                ? $pre.classList.remove('box-open')
                : $pre.classList.add('box-open');
        }, true);
    });
})();