function wait() {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 1000);
    });
}

const color1 = "#91C8E4", color2 = "#FFA41B", color3 = "#557A46", color4 = "#8C3333", color5 = "#EF6262";


let nums = [];

let html_nums = [];

function generateNumbers() {
    let temp = [];

    for(let i=0;i<10;i++)
    {
        let x = 10 + Math.floor(Math.random()*50);
        temp.push([x, color1]);
    }

    nums = temp;

    html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);

    document.getElementById("container").innerHTML = html_nums.join(' ');
    document.getElementById("sort--button").disabled = false;
}


async function partition(low, high) {
    let pivot = nums[high][0];

    nums[high][1] = color2;

    html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);
    document.getElementById("container").innerHTML = html_nums.join(' ');

    let i = low - 1;    

    for(let j=low; j<high; j++) {
        nums[j][1] = color3
        html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);
        document.getElementById("container").innerHTML = html_nums.join(' ');

        if(nums[j][0] < pivot) {
            i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
            nums[i][1] = color4;

            html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);
            document.getElementById("container").innerHTML = html_nums.join(' ');
        }

        const resolve = await wait();
    }

    [nums[i+1], nums[high]] = [nums[high], nums[i+1]];

    // const resolve = await wait();

    html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);
    document.getElementById("container").innerHTML = html_nums.join(' ');

    nums[i+1][1] = color1;    
    return i+1;
}

async function quick_sort(low, high) {
    if(low <= high) {
        const p = await partition(low, high);

        const resolve = await wait();
        
        nums[p][1] = color5;
        for(let i=0;i<10;i++)
        {
            if(nums[i][1] !== color5) {
                nums[i][1] = color1;       
            }
        }

        html_nums = nums.map(num => `<div style="height: ${num[0]}vh; width: 30px; background-color: ${num[1]}; bottom: 0;"></div>`);
        document.getElementById("container").innerHTML = html_nums.join(' ');

        const resolve2 = await wait();

        const res1 = await quick_sort(low, p-1);
        const res2 = await quick_sort(p+1, high);
    }
}

async function sortNumbers() {
    document.getElementById("sort--button").disabled = true;
    document.getElementById("generate--button").disabled = true;

    const res = await quick_sort(0, nums.length - 1);

    document.getElementById("container").innerHTML = html_nums.join(' ');
    
    document.getElementById("sort--button").disabled = false;
    document.getElementById("generate--button").disabled = false;
}