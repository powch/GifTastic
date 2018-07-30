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
        'bulldog'
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
        this.buttonArray.push(str);
        this.buttonGen();
        addInput.val('');
    },
    getGifs: function () {
        results.empty();
        var query = $(this).attr('data-name');
        var gifURL = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=tDjp5PLvgtv2hcm320xZ2oF8jKsRCHKK&limit=10`;
        $.ajax({
            url: gifURL
        }).then(function (res) {
            $.each(res.data, function (key, val) {
                console.log(val);
                var newDiv = $('<div>');
                newDiv.addClass('row mt-5');

                var newGifCol = $('<div>');
                newGifCol.addClass('col-sm-5 offset-sm-2 text-center');

                var newGif = $('<img>');
                newGif.attr('src', val.images.fixed_width.url);

                var newGifDescCol = $('<div>');
                newGifDescCol.addClass('col-sm-1 text-center');

                var newGifTitle = $('<p>');
                newGifTitle.text(`Title: ${val.title}`);

                var newGifRating = $('<p>');
                newGifRating.text(`Rating: ${val.rating.toUpperCase()}`);

                newGifCol.append(newGif);
                newGifDescCol.append(newGifTitle, newGifRating);
                newDiv.append(newGifCol, newGifDescCol);
                results.append(newDiv);
            });
        });
    }
}

funcs.buttonGen();

addBtn.click(function () {
    event.preventDefault();
    funcs.addButton();
});

gifButtons.on('click', '.puppyBtn', funcs.getGifs);