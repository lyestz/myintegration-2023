
if (window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api/)){
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),searchParams = new URLSearchParams(location.hash);

    let was_solved = false;
    let was_incorrect = false;
    let solved_urls = [];
    while (true) {
    await sleep(3000);
    await on_widget_frame();
    await sleep(2000);
    await on_image_frame();
    }


    function is_widget_frame() {
        return document.querySelector('.recaptcha-checkbox') !== null;
    }


    function is_image_frame() {
        return document.querySelector('#rc-imageselect') !== null;
    }


    function open_image_frame() {
        document.querySelector('#recaptcha-anchor')?.click();
    }


    function is_invalid_config() {
        return document.querySelector('.rc-anchor-error-message') !== null;
    }


    function is_rate_limited() {
        return document.querySelector('.rc-doscaptcha-header') !== null;
    }


    function is_solved() {
        const is_widget_frame_solved = document.querySelector('.recaptcha-checkbox')?.getAttribute('aria-checked') === 'true';
        const is_image_frame_solved = document.querySelector('#recaptcha-verify-button')?.disabled;
        return is_widget_frame_solved || is_image_frame_solved;
    }


    function on_images_ready(timeout=15000) {
        return new Promise(async resolve => {
            const start = 3000;
            while (true) {
                const $tiles = document.querySelectorAll('.rc-imageselect-tile');
                const $loading = document.querySelectorAll('.rc-imageselect-dynamic-selected');
                const is_loaded = $tiles.length > 0 && $loading.length === 0;
                if (is_loaded) {
                    return resolve(true);
                }
                await sleep(1000);
            }
        });
    }


    function get_image_url($e) {
        return $e?.src?.trim();
    }


    async function get_task(task_lines) {
        let task = null;
        if (task_lines.length > 1) {
            task = task_lines.slice(0, 2).join(' ');
            task = task.replace(/\s+/g, ' ')?.trim();
        }
        else {
            task = task.join('\n');
        }
        if (!task) {
            return null;
        }
        return task;
    }


    let last_urls_hash = null;
    function on_task_ready(i=1000) {
        return new Promise(resolve => {
            const check_interval = setInterval(async () => {
                const task_lines = document.querySelector('.rc-imageselect-instructions')?.innerText?.split('\n');
                let task = await get_task(task_lines);
                if (!task) {
                    return;
                }

                const is_hard = (task_lines.length === 3) ? true : false;

                const $cells = document.querySelectorAll('table tr td');
                if ($cells.length !== 9 && $cells.length !== 16) {
                    return;
                }

                const cells = [];
                const urls = Array($cells.length).fill(null);
                let background_url = null;
                let has_secondary_images = false;
                let i = 0;
                for (const $e of $cells) {
                    const $img = $e?.querySelector('img');
                    if (!$img) {
                        return;
                    }

                    const url = get_image_url($img);
                    if (!url || url === '') {
                        return;
                    }

                    if ($img.naturalWidth >= 300) {
                        background_url = url;
                    }
                    else if ($img.naturalWidth == 100) {
                        urls[i] = url;
                        has_secondary_images = true;
                    }

                    cells.push($e);
                    i++;
                }
                if (has_secondary_images) {
                    background_url = null;
                }

                clearInterval(check_interval);
                return resolve({task, is_hard, cells, background_url, urls});
            }, i);
        });
    }


    function submit() {
        document.querySelector('#recaptcha-verify-button')?.click();
    }


    function got_solve_incorrect() {
        const errors = [
            '.rc-imageselect-incorrect-response',// try again
        ];
        for (const e of errors) {
        if (document.querySelector(e)?.style['display'] === '') {
                return true;
            }
        }
        return false;
    }

    function got_solve_error() {

        const errors = [
            '.rc-imageselect-error-select-more',
            '.rc-imageselect-error-dynamic-more',
            '.rc-imageselect-error-select-something',
        ];
        for (const e of errors) {
            const $e = document.querySelector(e);
            if ($e?.style['display'] === '' || $e?.tabIndex === 0) {
                return true;
            }
        }
        return false;
    }


    function is_cell_selected($cell) {
        try {
            return $cell.classList.contains('rc-imageselect-tileselected');
        } catch {}
        return false;
    }


    async function on_widget_frame(settings) {

        if (is_solved()) {
            if (!was_solved) {
                was_solved = true;
            }
            return;
        }
        was_solved = false;
        await sleep(1000);
        open_image_frame();
    }


    async function on_image_frame() {
        if (is_rate_limited()) {
            console.log('rate limited');
            return;
        }

        // Wait if verify button is disabled
        if (is_solved()) {
            return;
        }

        // Incorrect solution
        if (!was_incorrect && got_solve_incorrect()) {
            solved_urls = [];
            was_incorrect = true;
        }
        else {
            was_incorrect = false;
        }

        if (got_solve_error()) {
            solved_urls = [];
            return;
        }

        // Wait for images to load
        const is_ready = await on_images_ready();
        if (!is_ready) {
            return;
        }

        const {task, is_hard, cells, background_url, urls} = await on_task_ready();
        const n = cells.length == 9 ? 3 : 4;

        const image_urls = [];
        let grid;
        let clickable_cells = [];
        if (background_url === null) {
            grid = '1x1';
            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                const cell = cells[i];
                if (url && !solved_urls.includes(url)) {
                    console.log(url)
                    image_urls.push(url);
                    clickable_cells.push(cell);
                }
            }
        }
        else {
            image_urls.push(background_url);
            grid = `${n}x${n}`;
            clickable_cells = cells;
        }

        const solve_start = 3000;
       let response = await fetch(APITZ, {
		method: 'POST',
        headers: {'Content-Type': 'application/json'},


        body: JSON.stringify({
            type: 'recaptcha',
            task: task,
            image_urls: image_urls,
            grid: grid,
            key: APIOCR,
        }),
	})
    var rp = await response.json();
    let taskId = rp.data
    getrslt(taskId,cells)

    async function getrslt(cc,aa){
	 let response = await fetch(`${APITZ}?key=${APIOCR}&id=${cc}`)

     var rp = await response.json();
        if (rp.error) {
         await sleep(300);
         return getrslt(cc,aa)
        }

        // Submit solution
        let clicks = 0;
        for (let i = 0; i < rp.data.length; i++) {
            if (rp.data[i] === false) {
                continue;
            }
            clicks++;

            // Click if not already selected
            if (!is_cell_selected(clickable_cells[i])) {
                clickable_cells[i]?.click();
                await sleep(250);
            }
        }

        for (const url of urls) {
            solved_urls.push(url);
            if (solved_urls.length > 9) {
                solved_urls.shift();
            }
        }

        if ((n === 3 && is_hard && clicks === 0 && await on_images_ready()) || (n === 3 && !is_hard) || n === 4) {
            await sleep(1000);
            submit();
        }
    }
    }

}
