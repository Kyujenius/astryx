// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file next transform manifest
 *
 * Staged codemods for the next release. The Version Packages PR promotes
 * this file into the resolved version folder.
 */

import renameFieldStatusPresentationType, {
  meta as renameFieldStatusPresentationTypeMeta,
} from './rename-field-status-presentation-type.mjs';

export default [
  {
    name: 'rename-field-status-presentation-type',
    transform: renameFieldStatusPresentationType,
    meta: renameFieldStatusPresentationTypeMeta,
  },
];
