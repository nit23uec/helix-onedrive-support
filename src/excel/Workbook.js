/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { NamedItemContainer } from './NamedItemContainer.js';
import { StatusCodeError } from '../StatusCodeError.js';
import { Table } from './Table.js';
import { Worksheet } from './Worksheet.js';

export class Workbook extends NamedItemContainer {
  constructor(oneDrive, uri, log) {
    super(oneDrive);

    this._oneDrive = oneDrive;
    this._uri = uri;
    this._log = log;
  }

  async getData() {
    const result = await this._oneDrive.doFetch(this._uri);
    return result.value;
  }

  async getWorksheetNames() {
    this.log.debug(`get worksheet names from ${this._uri}/worksheets`);
    const result = await this._oneDrive.doFetch(`${this._uri}/worksheets`);
    return result.value.map((v) => v.name);
  }

  worksheet(name) {
    return new Worksheet(this._oneDrive, `${this._uri}/worksheets`, name, this._log);
  }

  async getTableNames() {
    this.log.debug(`get table names from ${this._uri}/tables`);
    const result = await this._oneDrive.doFetch(`${this._uri}/tables`);
    return result.value.map((v) => v.name);
  }

  table(name) {
    return new Table(this._oneDrive, `${this._uri}/tables`, name, this._log);
  }

  async addTable(address, hasHeaders, name) {
    if (name) {
      const names = await this.getTableNames();
      if (names.includes(name)) {
        throw new StatusCodeError(`Table name already exists: ${name}`, 409);
      }
    }
    const result = await this._oneDrive.doFetch(`${this.uri}/tables/add`, false, {
      method: 'POST',
      body: {
        address,
        hasHeaders,
      },
    });
    const table = this.table(result.name);
    if (name && name !== table.name) {
      await table.rename(name);
    }
    return table;
  }

  get uri() {
    return this._uri;
  }

  get log() {
    return this._log;
  }
}
