if (!EOL) { var EOL = {}; }

var _TOOLTIP_OPEN = false;

EOL.max_meta_rows = 10;

EOL.enable_button = function($button) {
  if ($button.is(':disabled')) {
    $button.removeAttr('disabled').fadeTo(225, 1);
  }
};

EOL.disable_button = function($button) {
  if (!$button.is(':disabled')) {
    $button.attr("disabled", true).fadeTo(225, 0.3);
  }
};

EOL.attribute_is_not_okay = function() {
  $('input#user_added_data_predicate').addClass('problems');
  $('#new_uri_warning').show();
  EOL.disable_measurement_input();
};

EOL.attribute_is_okay = function() {
  $('input#user_added_data_predicate').removeClass('problems');
  $('#new_uri_warning').hide();
  if ($('#predicate_uri_type').val() == 'measurement' && $('#user_added_data_predicate').val() != '') {
    $('fieldset.unit_of_measure').fadeIn(100);
  } else {
    EOL.disable_measurement_input();
  }
};

EOL.disable_measurement_input = function() {
  $('fieldset.unit_of_measure').fadeOut(100);
  $('fieldset.unit_of_measure input').val('');
}

EOL.hide_data_tables = function(tables) {
  tables.hide();
  tables.prev('div.header_underlined').hide();
};

EOL.show_data_tables = function(tables) {
  tables.show();
  tables.prev('div.header_underlined').show();
  tables.find('tr.data').show();
  tables.find('tr.actions').hide();
  $('ul.glossary').show().prev().show();
};

EOL.toggle_actions_row = function(data_row) {
  var $folder = data_row.find('.fold img');
  var $next_row = data_row.next();
  var $next_row_data = $next_row.children('td');
  var $table = data_row.next().find('table.meta');
  if ($next_row.is(":visible")) {
    $folder.attr('src', "/assets/arrow_fold_right.png");
    $next_row.hide();
    $table.hide();
  } else {
    var data_point_id = data_row.attr('id');
    // the metadata table hasn't been loaded yet, so load it dynamically
    if ($table.length == 0) {
      $.ajax({
        url: '/data_point_uris/' + data_point_id.replace('data_point_', '') + '/show_metadata',
        dataType: 'html',
        success: function(response) {
          $next_row_data.prepend(response).find('th.info').each(function() {
            var html = $(this).html();
            $(this).remove();
            data_row.closest('table').next().next('ul.glossary').append('<li>'+html+'</li>');
          });
          EOL.info_hints();
        },
        error: function(xhr, stat, err) { $next_row.html('<p>Sorry, there was an error: '+stat+'</p>'); },
        complete: function() {
          $folder.attr('src', "/assets/arrow_fold_down.png");
          $next_row.show();
          EOL.yank_glossary_terms($next_row);
          $table.show();
        }
      });
    } else
    {
      $folder.attr('src', "/assets/arrow_fold_down.png");
      $next_row.show();
      $table.show();
    }
  }
}

EOL.enable_suggestions_hover = function() {
  $('input#user_added_data_predicate').parent().hover(function() {
    if (!$('ul.ui-autocomplete').is(':visible') && $('input#user_added_data_predicate').val() == '') {
      $('div#suggestions').show();
    } else $('div#suggestions').hide();
  }, function () {
    $('div#suggestions').hide();
  });
}

EOL.disable_suggestions_hover = function() {
  $('input#user_added_data_predicate').parent().unbind('hover');
}

function update_input_id_and_name(form, new_id) {
  form.find('input').each(function() {
    $(this).attr('id', $(this).attr('id').replace(/\d+/, new_id));
    $(this).attr('name', $(this).attr('name').replace(/\d+/, new_id));
    // these 3 fields are used in autocompleting of metadata
    if ($(this).attr('data-id-element')) {
      $(this).attr('data-id-element', $(this).attr('data-id-element').replace(/\d+/, new_id));
    }
    if ($(this).attr('data-include-predicate_known_uri_id')) {
      $(this).attr('data-include-predicate_known_uri_id', $(this).attr('data-include-predicate_known_uri_id').replace(/\d+/, new_id));
    }
    if ($(this).attr('data-update-elements')) {
      $(this).attr('data-update-elements', $(this).attr('data-update-elements').replace(/\d+/, new_id));
    }
  });
}

EOL.limit_data_rows = function() {
  $('table.data tr.more').remove();
  $('table.data tr.data.first_of_type:visible').each(function() {
    var type = $(this).attr('data-type');
    var $nested_set = $(this).closest('table').find('tr[data-type="' + type + '"]:visible');
    if ($nested_set.length > EOL.max_meta_rows) {
      var $index = 1;
      $nested_set.each(function() { if ($index > EOL.max_meta_rows) $(this).hide(); $index++; });
      $nested_set.filter(':last').after(
        '<tr data-type="' + type + '" class="data nested more"><th></th><td><a href="#" class="more">' +
        $('table.data').attr('data-more').replace('NNN', ($nested_set.length-EOL.max_meta_rows)) +
        '</a></td></tr>');
      $('tr.more a.more').unbind('click').on('click', function() {
        var $parent_row = $(this).closest('tr');
        $('tr.data[data-type="' + $parent_row.attr('data-type') +'"]').show();
        $parent_row.remove();
        return(false);
      });
    }
  });
};

EOL.yank_glossary_terms = function($row) {
};

EOL.info_hints = function() {
  // Give hints about terms... TODO - this is lame; refactor.
  $('.term').each(function() {
    if ($(this).parent().find('a.info_icon').length > 0) {
      var $info_icon = $(this).parent().find('a.info_icon').first();
      var bg = $info_icon.css('background-image');
      if (bg != 'none') {
        $info_icon.attr('data-bg', $info_icon.css('background-image'));
        $info_icon.css('background-image', 'none');
      }
      $(this).parent().unbind('hover').hover(
        function() {
          $info_icon.css('background-image', $info_icon.attr('data-bg'));
        }, function() {
          $info_icon.css('background-image', 'none');
        }
      );
    }
  });
};


$(function() {

  $('.has_many').each(function() {
    var $subform = $(this).clone();
    $subform.find('.once').remove();
    var last_input = $(this).closest('form').find('input[id^=user_added_data_user_added_data_metadata_attributes]').filter(':last');
    var highest_field_id = parseInt(last_input.attr('id').match(/(\d+)/)[1]);
    update_input_id_and_name($subform, highest_field_id += 1);
    $subform.appendTo($(this)).addClass('subform').hide();
    $(this).append('<span class="add"><a href="#">'+$(this).attr('data-another')+'</a></span>');
    $(this).find('.add a').on('click', function() {
      $subform.clone().insertBefore($(this).parent()).show();
      update_input_id_and_name($subform, highest_field_id += 1);
      var form_h = $('.has_many_expandable').height();
      $('.has_many_expandable').height(form_h + $subform.height());
      return(false);
    });
  });

  $('div#suggestions').appendTo($('input#user_added_data_predicate').parent());

  $('input#user_added_data_predicate').keyup(function(e) {
    var key = e.keyCode || e.which;
    // it was the return key that was pressed, likely the user
    // choosing an autocomplete value from the list, so do nothing
    if (key === 13) return;
    var $field = $(this)
    if ($field.val() != '') {
      $('div#suggestions').hide();
    }
    if ($('#user_added_data_predicate_known_uri_id').val() != '') {
      $('#user_added_data_predicate_known_uri_id').val('');
      EOL.attribute_is_not_okay();
    }
    if ($field.val() == '' || $('#user_added_data_predicate_known_uri_id').val() != '') {
      EOL.attribute_is_okay();
    } else EOL.attribute_is_not_okay();
  }).focus(function() {
    if ($(this).val() == '') {
      $('div#suggestions').show();
    }
  });

  EOL.enable_suggestions_hover();

  $('fieldset.unit_of_measure').hide();

  $('table.data .fold a').on('click', function() { $(this).closest('tr').click(); return(false); }); // These links just click the row, with JS.

  $('table.data tr.actions').hide().prev().find('.fold img').attr('src', "/assets/arrow_fold_right.png");

  $('table.data tr.data').on('click',
    function(e) {
      if ($(e.target).closest('a').length) return; // It's a link, don't handle the row...
      EOL.toggle_actions_row($(this));
    });

  $('table.data tr.actions td .metadata').live('click',
    function(e) {
      if ($(e.target).closest('a').length) return; // It's a link, don't handle the row...
      EOL.toggle_actions_row($(this).closest('tr').prev());
    });

  $('#recently_used_category a').on('click', function() {
    $('#suggestions').find('.child').hide();
    var $next = $(this).parent().next();
    while($next.hasClass('child')) {
      $next.show();
      $next = $next.next();
    }
    return(false);
  });

  $('li.attribute').live('click', function() {
    var span = $(this).find('.name');
    $('#user_added_data_predicate').val(span.text());
    $('#user_added_data_predicate_known_uri_id').val(span.data('id'));
    $('#predicate_uri_type').val(span.data('uri_type'));
    $('#user_added_data_has_values').val(span.data('has_values'));
    EOL.attribute_is_okay();
    $('div#suggestions').hide();
  });

  // any chosen autocomplete value is legitimate
  $('#user_added_data_predicate').bind('railsAutocomplete.select', function(event, data){
    EOL.attribute_is_okay();
  });

  $('input[data-autocomplete]').live('focus', function() {
    // if the field is a value autocomplete, check the hidden *_has_values
    // field to see if we should disable autocomplete or not
    if ($(this).data('autocomplete').match(/known_uri_values/)) {
      var value_toggle = $(this).closest('div').find('input[id*="has_values"]:first');
      if (value_toggle.length > 0) {
        if (value_toggle.val() == '1') $(this).autocomplete('enable');
        else $(this).autocomplete('disable');
      }
    }

    // for the primary measurement, always autocomplete with the value in the text input. The other
    // autocomplete fields will search on ' ' to show always show the pick-list on focus. The primary
    // measurment field will show the custom selector when the field is empty
    if ($(this).attr('id') == 'user_added_data_predicate') {
      $(this).autocomplete("search", $(this).val());
    } else $(this).autocomplete("search", ' ');
  });

  // this helps show default pick-lists when the fields are empty
  $('input[data-autocomplete]').keyup(function(e) {
    var key = e.keyCode || e.which;
    // do nothing if it the key pressed was an arrow key, that would interfere with autocomplete selection
    if (key === 37 || key === 38 || key === 39 || key === 40) return;
    if ($(this).val() == '') {
      if ($(this).attr('id') == 'user_added_data_predicate') {
        $('div#suggestions').show();
      } else $(this).autocomplete("search", ' ');
    }
  });

  $('#tabs_sidebar.data ul.subtabs a').on('click', function() {
    $('.about_subtab').hide();
    if ($(this).parent().hasClass('about')) {
      EOL.hide_data_tables($('table.data'));
      $('#taxon_data .empty').hide();
      $('.about_subtab').show()
      $('ul.glossary').hide().prev().hide();
    } else if ($(this).hasClass('all')) { // Acts as a reset button/link
      $('#taxon_data .empty').show();
      EOL.show_data_tables($('table.data'));
    } else {
      EOL.hide_data_tables($('table.data'));
      EOL.show_data_tables($('table.data[data-toc_id="' + $(this).attr('data-toc-id') + '"]'));
    }
    $(this).parent().parent().find('li').removeClass('active');
    $(this).parent().addClass('active');
    // Reset other aspects of the table:
    $('table.data tr.open').removeClass('open');
    $('table.data .fold img').attr('src', "/assets/arrow_fold_right.png");
    $('table.meta').hide();
    EOL.limit_data_rows();
    return(false);
  });

  EOL.limit_data_rows();

  if (location.hash != "") {
    var name  = location.hash.replace(/\?.*$/, '');
    var $row = $(name);
    $row.click();
    if ($row.offset() !== undefined) {
      var new_top = $row.offset().top - 200;
      $("html, body").animate({ scrollTop: new_top });
    }
  }

  // Remove links on the overview should be hidden until you hover:
  $('#data_summary table').hover(function() {
    $('span.remove').show();
  }, function () {
    $('span.remove').hide();
  }).find('span.remove').hide();

  $('a.button.hidden').hide();

  $('#sortable').sortable({
    placeholder: "placeholder", items: "tr:not(.headers)", helper: 'clone', tolerance: 'pointer',
    update: function(e, ui) {
      $.post("/known_uris/sort", { known_uris: $("#sortable").sortable('toArray'), moved_id: ui.item.attr('id') })
    }
  }).disableSelection();

  $('#sortable a.to_top').click(function() {
    $.post("/known_uris/sort", { to: 'top', moved_id: $(this).closest('tr').attr('id') })
    return(false);
  });

  $('#sortable a.to_bottom').click(function() {
    $.post("/known_uris/sort", { to: 'bottom', moved_id: $(this).closest('tr').attr('id') })
    return(false);
  });

  // Definitions of Attributes are dialogs if JS is enabled:
  $('table.data tr.first_of_type span.info, table.data.search tr span.info').each(function() {
    var nearest = $(this).closest('tr').attr('id'); // We need to remember which one is open; click again and it closes.
    $(this)
      .attr('id', "info_"+nearest)
      .before('<a class="info_icon" data-info="'+nearest+'">&nbsp;</a>')
      .addClass('tip')
      .prepend('<a href="#" class="close">&nbsp;</a>');
    $(this).appendTo(document.body);
  });
  $('a.info_icon')
    .on('click', function() {
      $('.site_column').unbind('click');
      var $link = $(this);
      var $info = $('#info_'+$(this).attr('data-info'));
      if ($info.is(':visible')) {
        $info.hide('fast');
      } else {
        $('.info.tip').hide('fast');
        var pos = $(this).offset();
        $info.css({ top: pos.top + $(this).height() + 26, left: pos.left + $(this).width() });
        $info.show('fast',
          function() {
            $('.site_column').click(function() { $('span.info').hide('fast'); $('.site_column').unbind('click'); });
          }
        ).find('a.close').on('click', function() { $('span.info').hide('fast'); return(false) } );
      }
    });

  $('.add_content .article').hide();
  $('.add_content .add_data a').on('click', function() {
    var $article = $('.add_content .article')
    if ($article.is(':visible')) {
      $(this).removeClass('open');
      $('.add_content .article').hide();
    } else {
      $(this).addClass('open');
      $('.add_content .article').show();
    }
    return(false);
  });

  EOL.info_hints(); // Note this needs to happen *after* the info icons are added.

});