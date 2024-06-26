import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';
import { getImageAsBase64 } from './utils';

const htmlHeader = `<head>
    <title>##report_title##</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Maksymilian Bahr">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">  
    <style>
      body {
        margin: 1rem;
      }
  
      .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8); /* Przezroczysty biały tło */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Wyżej niż inne elementy */
      }

      .loading-text {
        font-size: 24px;
      }

      .table {
        --bs-table-border-color: #ecf0f3;
        vertical-align: middle;
      }
  
      h2 {
        margin-top: 3rem;
      }
  
      .summary {
        text-align: center;
        font-size: 25pt;
        border: 0px;
      }
  
      button {
        margin: 3px;
      }
  
      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
  
      .modal-dates, .modal-metadata, .model-test-testreq-label {
        font-size: small;
        color: #858585;
      }
  
      .modal-start-time, .modal-end-time, .modal-duration,
      .modal-domain, .modal-feature, .model-test-testreq {
        font-size: 11pt;
        color: black;
      }
  
      .attachments-heading {
        margin: 5px 20px;
        font-size: 1.1rem;
        color: rgb(73, 71, 71);
      }
  
      .attachments-text ul{
        list-style-type: none;
      }
  
      .error-heading {
        margin: 5px 20px;
        font-size: 1.1rem;
      }
  
      .error-text{
        margin: 5px 20px;
        margin-bottom: 25px;
      }
  
      pre {
        white-space: pre-wrap;
        color: inherit;
      }
  
      .row.test-metadata {
        margin-bottom: 0rem;
      }
  
      .row.test-metadata .label {
        text-transform: lowercase;
        color: darkgray;
        font-size: smaller;
      }
  
      .row.test-metadata .value {
        color: dimgrey;
      }

      .test-req {
        margin-top: 3px;
        color: dimgrey;
        font-size: smaller;
      }
  
      .test-title {
        font-weight: 500;
      }
  
      .test-params {
        font-style: italic;
        font-size: small;
        font-weight: 400;
      }
  
      .error-msg {
        white-space: pre-wrap;
        word-break: break-word;
        border: 1px solid #ff9a9a;
        border-left-width: 3px;
        border-radius: 6px;
        padding: 10px;
        color: #ae2727;
        width: fit-content;
        margin: 5px 0px;
      }
  
      .passed-msg {
        white-space: pre-wrap;
        border: 1px solid #47d842;
        border-left-width: 3px;
        border-radius: 6px;
        padding: 10px;
        color: #0e8a09;
        width: fit-content;
        margin: 5px 0px;
      }
  
      .ignored-msg {
        white-space: pre-wrap;
        border: 1px solid #cbcccb;
        border-left-width: 3px;
        border-radius: 6px;
        padding: 10px;
        color: #858585;
        width: fit-content;
        margin: 5px 0px;
      }
  
      .table-hover > tbody > tr:hover {
        --bs-table-hover-bg: #f8f8f8; 
        cursor: pointer;
      }
  
      .step-data pre {
        color: #858585;
        font-size: 10pt;
        margin: 0px 0px;      
      }
  
      .step-logs pre {
        color: #858585;
        font-size: 10pt;
        margin: 0px 0px;      
      }
  
      .step-time {
        color: #858585;
      }
  
      .step-var {
        color: #0e67ec
      }
  
      .container-wrapper {
        border: 1px solid #ecf0f3;
        background-color: #fbfbfb;
        border-radius: 15px;
        margin-bottom: 20px;
      }
  
      .progressbar-passed {
        background-color: #00d26e;
      }
  
      .progressbar-failed {
        background-color: #f63d63;
      }
  
      .progressbar-ignored {
        background-color: #cbcccb;
      }
  
      .progressbar-label {
        font-size: 1rem;
      }
  
      .tooltip-list {
        list-style: none;
        text-align: left;
        font-size: larger;
        padding: 5px 5px;
        margin: 0px 0px;
      }
  
      .tooltip-total {
        border-top: 1px solid rgb(238, 236, 236);
        font-weight: 500;
        padding-top: 2px;
        margin-top: 3px;
      }
  
      .x-small {
        font-size: 0.75rem;
      }
  
      .total-passed-percentage {
        font-size: 5rem;
        color: #00d26e;
      }
  
      .row-summary {
        margin-bottom: 3px;
      }
  
      .summary-details {
        border: 1px solid #ecf0f3;
        background-color: white;
        padding: 20px 10px;
        border-radius: 15px;
        margin-left: 40px;
      }

      .screenshot, .player-video {
        max-width: 80%;
        max-height: 80%;
        border: 1px solid #ecf0f3;
      }
  
    </style>
  </head>`;

const htmlExecutionSummary = `<div class="container pt-3">
        <h2 style="margin-top: 1rem;">Execution Summary</h2>
        <div class="row">
          <div class="col container-wrapper">
            ##summary_rows##
          </div>        
        </div>
      </div>`;

const htmlDomainTestSummary = `<div class="container pt-3">
        <h2>Domain Test Summary</h2>
          <div class="row">
            <div class="col container-wrapper">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th></th>
                    <!--<th>Total</th>
                    <th>Passed</th>
                    <th>Failed</th>
                    <th>Ignored</th>-->
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  ##domain_summary_rows##
                </tbody>
              </table>
            </div>
          </div>
      </div>`;

const htmlTestResults = `<div class="container pt-3">
        <h2>Test Results</h2>      
        <div class="container container-wrapper" style="padding-top: 15px;">
          <div class="row">
            <div class="col">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelectDomain">Domain</label>
                <select class="form-select" id="inputGroupSelectDomain">
                  <option selected>Choose...</option>
                  ##domainFilterOptions##
                </select>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelectFeature">Feature</label>
                <select class="form-select" id="inputGroupSelectFeature">
                  <option selected>Choose...</option>
                  ##featureFilterOptions##
                </select>
              </div>
            </div>
            <div class="col-5">
              <input type="checkbox" class="btn-check" id="btn-check-passed">
              <label class="btn btn-outline-secondary" for="btn-check-passed">✅ Passed</label>
              <input type="checkbox" class="btn-check" id="btn-check-failed">
              <label class="btn btn-outline-secondary" for="btn-check-failed">❌ Failed</label>
              <input type="checkbox" class="btn-check" id="btn-check-ignored">
              <label class="btn btn-outline-secondary" for="btn-check-ignored">⚪ Ignored</label>
              <input type="checkbox" class="btn-check" id="btn-check-rerun">
              <label class="btn btn-outline-secondary" for="btn-check-rerun">🔄 Rerun</label>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupText">Search by text</label>
                <input type="text" class="form-control" id="inputGroupText" aria-label="Search by text" placeholder="Enter test name or requirements">
              </div>
            </div>  
            <div class="col">
              <button type="button" class="btn btn-light" onclick="clearForm()">Clear</button>
            </div>      
          </div>
        </div>
        <div class="row">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Result</th>
                <th>Test Name</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ##test_rows##
            </tbody>
          </table>
        </div>
      </div>`;

function htmlModal(noLogs: boolean): string {
  return `<!-- Modal -->
    <div class="modal fade" id="modal-test-results" tabindex="-1" aria-labelledby="modal-test-results" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" style="max-width: 90%">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Test Logs</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- Modal body -->
          <div id="modal-body" class="modal-body"></div>
          <div class="modal-footer d-flex justify-content-between">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="toggleLogs" ${noLogs ? 'disabled' : ''}>
              <label class="form-check-label" for="toggleLogs">Show logs</label>
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
}

const htmlScriptsBootstrap = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script>
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
  });
</script>
`;

const htmlScriptsTestResults = `<script>
      const exampleModal = document.getElementById('modal-test-results')
      exampleModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const start = button.getAttribute('data-bs-start');
        const end = button.getAttribute('data-bs-end');
        const duration = button.getAttribute('data-bs-duration');
        const outcome = button.getAttribute('data-bs-icon-outcome');
        const title = button.getAttribute('data-bs-title');
        const params = button.getAttribute('data-bs-params');
        const testreq = button.getAttribute('data-bs-testreq');
        const domain = button.getAttribute('data-bs-domain');
        const feature = button.getAttribute('data-bs-feature');
        const content = button.getAttribute('data-bs-content');
        const contentHtml = button.getAttribute('data-bs-content-html');
  
        const modalBody = exampleModal.querySelector('.modal-body');
        if (content) {
          modalBody.innerHTML = \`<pre class="modal-body-text">\${content}</pre>\`;
        } else {
          modalBody.innerHTML = contentHtml;
        }
  
        const paramsComponent = (!params || params.trim() === '') ? '' : \`<span class="model-test-params">\${params}</span><br/>\`;
        const testreqComponent = (!testreq || testreq.trim() === '') ? '' : \`<br/><span class="model-test-testreq-label">requirements: </span><span class="model-test-testreq">\${testreq}</span>\`;
        const testMetadata = \`<span class='modal-metadata'>
              domain:&nbsp;<span class="modal-domain">\${domain}</span>&nbsp;&nbsp;
              feature:&nbsp;<span class="modal-feature">\${feature}</span>&nbsp;&nbsp;
            </span>\`;
        const dateTimeDuration = \`<span class='modal-dates'>
              start:&nbsp;<span class="modal-start-time">\${start}</span>&nbsp;&nbsp;
              end:&nbsp;<span class="modal-end-time">\${end}</span>&nbsp;&nbsp;
              duration:&nbsp;<span class="modal-duration">\${duration}</span>&nbsp;&nbsp;
            </span>\`;
        const modalTitle = exampleModal.querySelector('.modal-title');
        modalTitle.innerHTML = \`\${outcome} \${title}<br/>
            \${paramsComponent}
            \${testMetadata}
            \${dateTimeDuration}
            \${testreqComponent}
        \`;
        
        //reset toggle
        document.getElementById("toggleLogs").checked = false;
      })
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
          var toggleLogs = document.getElementById('toggleLogs');
  
          toggleLogs.addEventListener('change', function() {
            var elementsToToggles = document.querySelectorAll('.step-logs');
            elementsToToggles.forEach(elementsToToggle => {
              if (toggleLogs.checked) {
                  elementsToToggle.classList.remove('d-none');
              } else {
                  elementsToToggle.classList.add('d-none');
              }
            })
          });
      });
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
          const domainSelect = document.getElementById('inputGroupSelectDomain');
          const featureSelect = document.getElementById('inputGroupSelectFeature');
          const searchText = document.getElementById('inputGroupText');
          const passedCheckbox = document.getElementById('btn-check-passed');
          const failedCheckbox = document.getElementById('btn-check-failed');
          const ignoredCheckbox = document.getElementById('btn-check-ignored');
          const rerunCheckbox = document.getElementById('btn-check-rerun'); 
        
          domainSelect.addEventListener('change', filterResults);
          featureSelect.addEventListener('change', filterResults);
          searchText.addEventListener('input', filterResults);
          passedCheckbox.addEventListener('change', filterResults);
          failedCheckbox.addEventListener('change', filterResults);
          ignoredCheckbox.addEventListener('change', filterResults);
          rerunCheckbox.addEventListener('change', filterResults);
  
          function filterResults() {
            const selectedDomain = domainSelect.value.trim().toLowerCase();
            const selectedFeature = featureSelect.value.trim().toLowerCase();
            const searchKeyword = searchText.value.trim().toLowerCase();
            const passedChecked = passedCheckbox.checked;
            const failedChecked = failedCheckbox.checked;
            const ignoredChecked = ignoredCheckbox.checked;
            const rerunChecked = rerunCheckbox.checked;
  
            const tableRows = document.querySelectorAll('.table-row');
            let index = 0;
            tableRows.forEach(row => {
                const domainValue = row.getAttribute('data-bs-domain').toLowerCase();
                const featureValue = row.getAttribute('data-bs-feature').toLowerCase();
                const titleValue = row.getAttribute('data-bs-title').toLowerCase();
                const testreqValue = row.getAttribute('data-bs-testreq').toLowerCase();
                const statusValue = row.getAttribute('data-bs-outcome').toLowerCase();
                const rerunValue = (row.getAttribute('data-bs-rerun') === 'true');
                const domainMatch = selectedDomain === 'choose...' || domainValue === selectedDomain;
                const featureMatch = selectedFeature === 'choose...' || featureValue === selectedFeature;
                const textMatch = titleValue.includes(searchKeyword) || testreqValue.includes(searchKeyword);
                const passedMatch = passedChecked && statusValue === 'passed';
                const failedMatch = failedChecked && statusValue === 'failed';
                const ignoredMatch = ignoredChecked && statusValue === 'ignored';
                const rerunMatch = rerunChecked && rerunValue === true;
                const checkboxCondition = ((passedMatch || failedMatch || ignoredMatch || rerunMatch) || (!passedChecked && !failedChecked && !ignoredChecked && !rerunChecked));
                if (domainMatch && featureMatch && textMatch && checkboxCondition) {
                    row.classList.remove('d-none');
                } else {
                    row.classList.add('d-none');
                }
            });
          }
      });
  
      function clearForm() {
        const elements = [
            'inputGroupSelectDomain',
            'inputGroupSelectFeature',
            'inputGroupText',
            'btn-check-passed',
            'btn-check-failed',
            'btn-check-ignored',
            'btn-check-rerun'
        ];
  
        elements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element.nodeName === 'INPUT' && element.type === 'checkbox') {
                element.checked = false;
                element.dispatchEvent(new Event('change'));
            } else if (element.nodeName === 'SELECT') {
              element.selectedIndex = 0;
              element.dispatchEvent(new Event('change'));
            } else {
              element.value = '';
              element.dispatchEvent(new Event('input'));
            }          
        });
      }

    </script>
    <script>
      function scrollToFilter(domain) {
        if(domain.trim() !== '') {
          var domainFilter = document.getElementById("inputGroupSelectDomain");          
          domainFilter.value = domain;
          domainFilter.dispatchEvent(new Event('change'));
          domainFilter.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    </script>`;

export async function getWebHtmlTemplate(parameters: IHtmlGeneratorParameters): Promise<string> {
  return `<!DOCTYPE html>
  <html lang="en">
  ${htmlHeader}
  <body>
  <!-- Div loading -->
  <div class="loading" id="loading">
    <div class="loading-text">Loading...</div>
  </div>
  <script>
    window.addEventListener('load', function() {
      document.getElementById('loading').style.display = 'none';    
      document.getElementById('content').style.display = 'block';    
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  </script>
  <div id="content" class="container" style="display: none;">
    <div class="row">
      <div class="col-10 d-flex align-items-center"><h1>##report_title_h1##</h1></div>
      ${
        parameters.projectLogoSrc && parameters.projectLogoSrc.startsWith('http')
          ? `<div class="col-2 d-flex align-items-center justify-content-end">
                <img width="150px" alt="Project Logo" class="projectLogo" src="${await getImageAsBase64(parameters.projectLogoSrc)}">
             </div>`
          : ''
      }
    </div>
    ${
      parameters.branchName && parameters.branchName.length > 0
        ? `<div class="row">
        <div>
          <span style="font-size: 9px; letter-spacing: 2px;">BRANCH: </span>
          <span class="fw-bold" style="color: #32a1ea">${parameters.branchName}</span>
        </div>
      </div>`
        : ''
    }
    ${htmlExecutionSummary}
    ${htmlDomainTestSummary}
    ${parameters.onlySummary ? '' : htmlTestResults}
  </div>
  <!--Modal-->
  ${parameters.onlySummary ? '' : htmlModal(parameters.noLogs)}
  <!--Scripts-->
  ${parameters.onlySummary ? '' : htmlScriptsTestResults}
  ${htmlScriptsBootstrap}
  </body>
  </html>
  `;
}
