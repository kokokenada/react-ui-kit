import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function AIWidgetIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.76833 38.5L41.25 22L2.76833 5.5L2.75 18.3333L30.25 22L2.75 25.6667L2.76833 38.5Z"
        id="SendB"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '28'}
      height={theme && theme.height ? theme.height : '28'}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18,6 C20.209139,6 22,7.790861 22,10 L22,18 C22,19.9255253 20.6753401,21.786149 18.0260203,23.581871 C18.5654117,21.193957 18.3975027,20 17.5222933,20 L10,20 C7.790861,20 6,18.209139 6,16 L6,10 C6,7.790861 7.790861,6 10,6 L18,6 Z M18,10 L10,10 C9.44771525,10 9,10.4477153 9,11 L9,14 C9,14.5522847 9.44771525,15 10,15 L18,15 C18.5522847,15 19,14.5522847 19,14 L19,11 C19,10.4477153 18.5522847,10 18,10 Z M12,11 C12.5522847,11 13,11.4477153 13,12 L13,13 C13,13.5522847 12.5522847,14 12,14 C11.4477153,14 11,13.5522847 11,13 L11,12 C11,11.4477153 11.4477153,11 12,11 Z M16,11 C16.5522847,11 17,11.4477153 17,12 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,12 C15,11.4477153 15.4477153,11 16,11 Z M4,10 L5,10 L5,10 L5,16 L4,16 C3.44771525,16 3,15.5522847 3,15 L3,11 C3,10.4477153 3.44771525,10 4,10 Z M23,10 L24,10 C24.5522847,10 25,10.4477153 25,11 L25,15 C25,15.5522847 24.5522847,16 24,16 L23,16 L23,16 L23,10 Z"
        id="AIWidget"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}
/*


 */
export default AIWidgetIcon;
