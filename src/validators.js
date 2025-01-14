import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants'
import { ICONS } from '@/icons'

export function isNull(value) {
  return value === null
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value)
}

export function isPageValid(page) {
  return NAV_ITEMS.some((it) => it.page === page)
}

export function isIconValid(icon) {
  return !!ICONS[icon]
}

export function isNavItemValid(item) {
  return NAV_ITEMS.includes(item)
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  return (
    isNull(id) ||
    [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
  )
}

export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}

function isNumber(value) {
  return typeof value === 'number'
}

function isUndefined(value) {
  return value === undefined
}

function isNumberOrNull(value) {
  return isNumber(value) || isNull(value)
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

function isString(value) {
  return typeof value === 'string'
}

function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

function isSelectOptionValid(op) {
  return (isNumber(op.value) || isNotEmptyString(op.value)) && isNotEmptyString(op.label)
}
