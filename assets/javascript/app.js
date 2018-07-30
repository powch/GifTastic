'use strict';

var gifButtons = $('#gifButtons');
var results = $('#results');
var addInput = $('#addInput');
var addBtn = $('#addBtn');

var funcs = {
    buttonArray: [
        'corgi',
        'boston terrier',
        'golden retriever',
        'husky',
        'samoyed',
        'australian shepherd',
        'pug',
        'bulldog',
        'french bulldog'
    ],
    buttonGen: function () {
        gifButtons.empty();
        for (var i = 0; i < this.buttonArray.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('type', 'button');
            newBtn.addClass('btn btn-primary puppyBtn');
            newBtn.attr('data-name', this.buttonArray[i]);
            newBtn.text(this.buttonArray[i]);
            gifButtons.append(newBtn);
        }
    },
    addButton: function () {
        var str = addInput.val();
        if (str) {
            this.buttonArray.push(str);
            this.buttonGen();
            addInput.val('');
        }
    },
    getGifs: function () {
        results.empty();
        var query = $(this).attr('data-name');
        var gifURL = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=tDjp5PLvgtv2hcm320xZ2oF8jKsRCHKK&limit=10`;
        $.ajax({
            url: gifURL
        }).then(function (res) {
            $.each(res.data, function (key, val) {
                var newDiv = $('<div>');
                newDiv.addClass('row mt-5');

                var newGifCol = $('<div>');
                newGifCol.addClass('col-sm-6 offset-sm-3 text-center');

                var newGif = $('<img>');
                newGif.attr('src', val.images.fixed_width_still.url);
                newGif.attr('data-still', val.images.fixed_width_still.url);
                newGif.attr('data-animate', val.images.fixed_width.url);
                newGif.attr('data-state', 'still');
                newGif.addClass('gif');

                var newGifTitle = $('<p>');
                newGifTitle.text(val.title);
                newGifTitle.addClass('title');

                var newGifRating = $('<p>');
                newGifRating.text(`Rating: ${val.rating.toUpperCase()}`);

                newGifCol.append(newGif, newGifTitle, newGifRating);
                newDiv.append(newGifCol);
                results.append(newDiv);
            });
        });
    },
    animateGif: function () {
        if ($(this).attr('data-state') === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else if ($(this).attr('data-state') === 'animate') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }
}

funcs.buttonGen();

addBtn.click(function () {
    event.preventDefault();
    funcs.addButton();
});

gifButtons.on('click', '.puppyBtn', funcs.getGifs);

results.on('click', '.gif', funcs.animateGif);