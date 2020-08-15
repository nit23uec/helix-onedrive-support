/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { GraphResult } from './OneDrive';

/**
 * Excel Table
 */
export declare interface Table {
  /**
   * Rename the table
   * @param name new name
   */
  rename(name): Promise<GraphResult>;

  /**
   * Return the header names of a table
   * @returns array of header names when resolved
   */
  getHeaderNames(): Promise<string[]>;

  /**
   * Return the array of rows of the table
   * @returns array of rows when resolved
   */
  getRows(): Promise<string[][]>;

  /**
   * Returns the rows as a list of objects. the rows have the columns names as property names
   * and the row values as value.
   */
  getRowsAsObjects(): Promise<Array<object>>;

  /**
   * Return a row given its index
   * @param index zero-based index of row
   * @returns row when resolved
   */
  getRow(index: number): Promise<string[]>;

  /**
   * Add a row to the table
   * @param values values for new row
   * @returns zero-based index of new row
   */
  addRow(values: string[]): Promise<number>;

  /**
   * Replace a row in the table
   * @param index zero-based index of row
   * @param values values to replace rows with
   */
  replaceRow(index: string, values: string): Promise<void>;

  /**
   * Delete a row from the table
   * @param index zero-based index of row
   */
  deleteRow(index: string): Promise<void>;

  /**
   * Get the number of rows in the table, not including the header row
   * @returns number of rows
   */
  getRowCount(): Promise<number>;
}
