/**
 * Copyright (c) 2012-2013 Dawid Kraczkowski. All rights reserved.
 * @version 1.2
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *      Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *
 *      Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
(function($) {
    var ajaxUploadIframe;
    $.fn.ajaxUpload = function(options) {
        var settings = $.extend({
            accept: ['*'],
            name: 'file',
            method: 'POST',
            url: '/',
            multiple: false,
            data: false,
            onSubmit: function() {
                return true;
            },
            onComplete: function() {
                return true;
            }
        }, options);

        //Iterate over the current set of matched elements
        return this.each(function() {
            //create form
            var button = $(this);
            button.css('position', 'relative');
            button.setData = function(data) {
                settings.data = data;
            }


            var form = $('<form style="margin: 0px !important; padding: 0px !important; position: absolute; top: 0px; left: 0px;"' +
                    ' method="' + settings.method + '" enctype="multipart/form-data" action="' + settings.url + '" target="__ajaxUploadIFRAME">' +
                    ' <input name="' + settings.name + '" type="file" ' + (settings.multiple ? ' multiple="true"' : '') + ' /></form>');

            var input = form.find('input[name=' + settings.name + ']');
            input.css({
                'display':'block',
                'width':button.width() + 8,
                'left':button.offset().left,
                'top':button.offset().top,
                'height':button.height() + 8,
                'text-align':'right',
                'opacity':'0',
                'z-index':'999999',
                'position':'absolute',
                'cursor':'pointer'
            });
            input.change(function(e) {
                form.find('input[type=hidden]').remove();
                var shouldSubmit = settings.onSubmit.call(button, $(this));
                if (shouldSubmit) {
                    //add data
                    if (settings.data) {
                        $.each(settings.data, function(n, v) {
                            form.append($('<input type="hidden" name="' + n + '" value="' + v + '">'));
                        });
                    }

                    form.submit();
                    $(form).find('input[type=file]').attr('disabled', 'disabled');
                } else {
                    $(form).find('input[type=file]').val('');
                }

            });
            if(button.is(':visible')){
                $("body").after(form);
            }else{
                input.css({
                    top:0,
                    left:0,
                    height:'100%'
                });
                form.css('height','100%');
                button.parent().append(form);
            }
                
            //check if iframe exists
            if (!ajaxUploadIframe) {
                ajaxUploadIframe = $('<iframe id="__ajaxUploadIFRAME" name="__ajaxUploadIFRAME"></iframe>').attr('style', 'style="width:0px;height:0px;border:0px solid #fff;"').hide();
                ajaxUploadIframe.attr('src', '');
                $(document.body).append(ajaxUploadIframe);
            }
            var onUpload = function() {
                $(form).find('input[type=file]').removeAttr('disabled');
                $(form).find('input:not([type=file])').remove();
                var response = $(this).contents().find('html body').text();
                try {
                    settings.onComplete.call(button, eval('(' + response + ')'));
                } catch (e) {
                    console.log("ajaxupload:"+response);
                    alert('服务器必须返回JSON格式数据。');
                }
                ajaxUploadIframe.unbind();
                $(form)[0].reset();
            };



            //on file submit
            form.submit(function(e) {
                //set iframe onload event
                ajaxUploadIframe.load(onUpload);
                form.attr('target', '__ajaxUploadIFRAME');
                e.stopPropagation();

            });

        });
    }

})(jQuery);