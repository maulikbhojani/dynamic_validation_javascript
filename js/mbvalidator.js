/**
 * Created by Maulik Bhojani on 24/2/17.
 */
/**
 * f = form
 * fe = form elements
 */

;(function($) {
    var mbvalidator = {
        required: function(e) {
            var d = $(e).val().trim();
            if(!d){ return false; }else{ return true; }
        },
        emailValidation: function(e) {
            var d = $(e).val().trim();
            if(!d){ return true; }
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(d);
        },
        numberValidation: function(e){
            var d = $(e).val().trim();
            if(!d){ return true; }
            return !(/\D/g.test(d));
        },
        decimalValidation: function (e) { //Decimal number
            var d = $(e).val().trim();
            if(!d){ return true; }
            return $.isNumeric(d);
        },
        submit: function (data) {
            mbvalidator.resetError($.fn.mbvalidator.defaults.errorBinding+'.'+$.fn.mbvalidator.defaults.errorClass);
            var resultSet = {};
            $.each(data.data.fe, function(k, e) {
                if(e.type == 'required'){
                    if(!mbvalidator.required(e.eobj)){
                        resultSet[e.name] = {'el': e.eobj, 'msg': $.fn.mbvalidator.defaults.requiredMsg };
                    }
                }else if(e.type == 'email'){
                    if(!mbvalidator.emailValidation(e.eobj)){
                        if (typeof resultSet[e.name] === 'undefined') {
                            resultSet[e.name] = {'el': e.eobj, 'msg':$.fn.mbvalidator.defaults.emailMsg };
                        }
                    }
                }else if(e.type == 'number'){
                    if(!mbvalidator.numberValidation(e.eobj)){
                        if (typeof resultSet[e.name] === 'undefined') {
                            resultSet[e.name] = {'el': e.eobj, 'msg':$.fn.mbvalidator.defaults.numberMsg };
                        }
                    }
                }else if(e.type == 'decimal'){
                    if(!mbvalidator.decimalValidation(e.eobj)){
                        if (typeof resultSet[e.name] === 'undefined') {
                            resultSet[e.name] = {'el': e.eobj, 'msg':$.fn.mbvalidator.defaults.decimalMsg };
                        }
                    }
                }
            });

            $.each(resultSet, function(k, e) {
                mbvalidator.setError(e.el, e.msg)
            });

            return $.isEmptyObject(resultSet);
        },
        setError: function(e, message) {
            if($.fn.mbvalidator.defaults.errorBinding){
                var e_class = 'class = "'+$.fn.mbvalidator.defaults.errorClass+'"';
                $(e).after('<'+$.fn.mbvalidator.defaults.errorBinding+' '+e_class+' >'+message+'</'+$.fn.mbvalidator.defaults.errorBinding+'>');
            }else{
                $(e).after(message);
            }

        },
        resetError:  function(c_name){
            $(c_name).remove();
        },
        setDefaults: function(options){
            $.each(options, function(k, v) {
                if(k in $.fn.mbvalidator.defaults){
                    if(k == 'errorClass' || k == 'errorBinding'){ //Can't be blank
                        if(v.trim()){
                            $.fn.mbvalidator.defaults[k] = v;
                        }
                    }else{
                        $.fn.mbvalidator.defaults[k] = v;
                    }

                }
            });
        },
    };

    // Public function
    $.fn.mbvalidator = function(rules, options) {
        var f   = $(this);
        var fe  = [];
        mbvalidator.setDefaults(options);

        if(rules.required.length > 0){
            $.each( rules.required, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'required',

                    });
                }
            });
            $.each( rules.email, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'email',

                    });
                }
            });
            $.each( rules.number, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'number',

                    });
                }
            });
            $.each( rules.decimal, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'decimal',

                    });
                }
            });
        }

        $(this).off('submit').on("submit", {
            f: f,
            fe:fe,
        }, mbvalidator.submit );

    };

    $.fn.mbvalidator.defaults = {
        errorBinding : 'div',
        errorClass   : 'error',
        requiredMsg  : 'This field is required.',
        emailMsg     : 'Please enter a valid email address.',
        numberMsg    : 'A number is required.',
        decimalMsg   : 'A decimal number is required.',
    };

    //$.fn.mbvalidator
    //$.mbvalidator.init();

})(jQuery);