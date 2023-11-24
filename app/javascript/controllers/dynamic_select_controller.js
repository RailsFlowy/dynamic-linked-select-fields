/*
 * Stimulus controller for dynamic linked select Fields
 *
 * This controller handles the interaction between two linked select fields: a
 * 'source' dropdown and a 'target' dropdown.
 *
 * Changing the 'source' dropdown selection automatically updates the options
 * in the 'target' dropdown.
 *
 * <div data-controller="dynamic-select"
 *      data-dynamic-select-url-value="<%= cities_path %>">
 *
 *   <select data-action="change->dynamic-select#change">
 *     <option value="3">France</option>
 *     <option value="1">Portugal</option>
 *     <option value="2">Spain</option>
 *    </select>
 *
 *    <select data-dynamic-select-target="select" id="city_id">
 *    </select>
 *  </div>
 *
 *
 *  Values:
 *
 *  - `url`: URL to fetch the target select options based on the source option
 *     selection. The URL should respond with a turbo-stream containing the
 *     targer options.
 *
 *  Targets:
 *
 *  - `select`: The target dropdown that gets updated dynamically.
 *
 */

import { Controller } from "@hotwired/stimulus"
import { get } from "@rails/request.js"

export default class extends Controller {
  static targets = ["select"]
  static values = {
    url: String
  }

  change(event) {
    if(event.target.selectedOptions[0].value == '') {
      // Clear the target dropdown if no option is selected in the source
      // dropdown
      this.selectTarget.options.length = 0
      this.selectTarget.options.add(new Option('', ''));
    } else {
      // Prepare parameters for the turbo-stream request
      let params = new URLSearchParams()

      // Append the selected option's value from the source dropdown
      params.append(event.target.id, event.target.selectedOptions[0].value)

      // 'target_id' identifies the target dropdown's id in the DOM. It's used
      // by the server response to direct the turbo-stream to the correct
      // target for updating options.
      params.append("target_id", this.selectTarget.id)

      // Send a turbo-stream request to update the target dropdown dynamically
      get(`${this.urlValue}?${params}`, {
        responseKind: "turbo-stream"
      })
    }
  }
}
