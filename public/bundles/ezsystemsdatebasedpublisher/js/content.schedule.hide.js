(function(global, doc, $) {
    const scheduleHideWidget = doc.querySelector('.ez-extra-actions--schedule-hide');

    if (!scheduleHideWidget) {
        return;
    }

    const confirmButton = doc.querySelector('.ez-btn--hide-confirm');
    const modal = doc.querySelector('#hide-content-modal');
    const hideLaterRadio = scheduleHideWidget.querySelector('#hide-later');
    const hideNowRadio = scheduleHideWidget.querySelector('#hide-now');
    const pickerInput = scheduleHideWidget.querySelector('.ez-picker__input');
    const flatpickrInstance = pickerInput._flatpickr;
    const form = doc.querySelector('form[name="date_based_hide"]');

    const { convertDateToTimezone, formatShortDateTime } = eZ.helpers.timezone;
    const userTimezoneCurrentTime = convertDateToTimezone(new Date());
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const minDate = new Date(convertDateToTimezone(userTimezoneCurrentTime, browserTimezone, true));

    flatpickrInstance.config.minDate = minDate;

    hideLaterRadio.addEventListener('change', () => {
        pickerInput.removeAttribute('disabled');
        scheduleHideWidget.classList.remove('ez-schedule-hide--hidden-calendar');

        flatpickrInstance.setDate(minDate.getTime(), true);
    });

    hideNowRadio.addEventListener('change', () => {
        pickerInput.setAttribute('disabled', true);
        scheduleHideWidget.classList.add('ez-schedule-hide--hidden-calendar');
        flatpickrInstance.setDate(null, true);
    });

    if (modal) {
        modal.querySelector('.btn-confirm').addEventListener('click', () => {
            form.submit();
        });
    }

    if (hideLaterRadio.hasAttribute('checked')) {
        pickerInput.removeAttribute('disabled');
    }

    confirmButton.addEventListener(
        'click',
        () => {
            if (modal) {
                $(modal).modal('show');
            } else {
                form.submit();
            }
        },
        false
    );
})(window, window.document, window.jQuery);
