/*
 * unicauth
 *  # Signature We use [digital signatures](https://en.wikipedia.org/wiki/Digital_signature) to avoid [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), every call or response has a signature that can be validated to ensure the data came from the trusted part.  #### Read and Write Keys <p>These keys are used for signing and verifying the requests/responses. The <u>Write Key is used when you send</u>   information to the API, so the API is sure that you are making the request. The <u>Read Key is used to verify   the information received</u> from the API, so you can be sure that the information was not altered.</p>  #### Getting the Query String Data To generate a signature for the URL's Query String you need to get all the Query String starting from `?` and ignoring the final `&signature={signatureData}`.  Example:<br> ```https://unicauth.com/api/session/?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry&signature=Se8SkYSkrMegn9Ydea8aFKzygR037D3lLg5OxUwSSYg=```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = \"?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry\"; ``` <br>  #### Getting the JSON Data To generate a signature for the JSON you need to get all the information inside the ```data``` key. This data must not be formatted.  Example:<br> ```{\"data\":{\"returnUrl\":\"https://circleaccess.circlesecurity.ai/demo/\",\"question\":\"Allow this operation?\",\"customID\":\"any-custom-data\",\"userID\":\"6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b\"},\"signature\":\"7OQSfVnOzkvuyqtasb8J+q/3os/u85R3X1UoKQxtRRE=\"}```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = JSON.stringify(json.data); ``` <br>  #### Signing the Data After getting the data, you can generate the signature by using ```HMAC SHA256 Base64``` encoding like the Node.js example bellow: ``` const crypto = require('crypto');  // {key} Use writeKey when sending data to Circle Auth. Use readKey when reading data received from Circle Auth. const hash = crypto.createHmac('sha256', \"{key}\").update(dataToEncrypt).digest('base64'); ```  For more ```HMAC SHA256 Base64``` examples please visit [Joe Kampschmidt's Code](https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/) or [Google Maps URL Signing Samples](http://googlemaps.github.io/url-signing/index.html).<br> For online crypto testing you can visit [DevLang](https://www.devglan.com/online-tools/hmac-sha256-online) and use *Output Text Format* as *Base64*.  # Errors The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format: ``` {   \"error\": \"something went wrong\" } ```  # Login Authentication To authenticate using Circle Auth you can just open the `Login URL` provided to you when you create a new Application in our [Console](https://console.unicauth.com).<br> Here is one example of `Login URL`: ``` https://unicauth.com/login/app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV ```  #### Data Return <section id=\"section-auth-return\">   <p class=\"mt-3\">After calling the <code>Login URL</code> and accepting the login on Circle Auth App, the page will be redirected to the <code>returnUrl</code> configured on our <a href=\"https://console.unicauth.com\">Console</a>.</p>   <p>Here is one example of a redirected URL:</p>   <div>     <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>     <pre><code id=\"codeRedirectedUrl\" class=\"language-uri word-break\">https://circleaccess.circlesecurity.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authRNozDyooWYpTQyvGpNdbtTRc9wESs96T</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">login</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=</span></code></pre>   </div>    <h5 id=\"auth-validate-signature\" class=\"mt-5\">Validating the Signature<a class=\"anchorjs-link \" aria-label=\"Anchor\" data-anchorjs-icon=\"#\" href=\"#auth-validate-signature\"></a></h5>    <p class=\"mt-3\">This validation uses the data from the returned URL above and apply the code from the <a href=\"#section/Signature\">Signature</a> section.</p>   <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeCheckSignature\" class=\"language-js\">var crypto = require('crypto'); // {readKey} Use your readKey available at Console. const hash = crypto.createHmac('sha256', '{readKey}')   .update('?userID=6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b&sessionID=session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC&authID=authRNozDyooWYpTQyvGpNdbtTRc9wESs96T&type=login')   .digest('base64'); //validate if signatures are equals if (hash === 'toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=') {   //do your stuff }</code></pre>   </div> </section> <br><br>  #### Styling <section id=\"section-auth-styling\">   <p>Here are the styles to be used for the Circle Auth login button:</p>   <ul class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">     <li class=\"nav-item\">       <a class=\"nav-link active\" id=\"nav-darktheme-tab\" data-toggle=\"tab\" href=\"#nav-darktheme\" role=\"tab\" aria-controls=\"nav-darktheme\" aria-selected=\"true\">Dark Theme</a>     </li>     <li class=\"nav-item\">       <a class=\"nav-link\" id=\"nav-lighttheme-tab\" data-toggle=\"tab\" href=\"#nav-lighttheme\" role=\"tab\" aria-controls=\"nav-lighttheme\" aria-selected=\"false\">Light Theme</a>     </li>   </ul>   <div class=\"tab-content\" id=\"nav-tabContent\">     <div class=\"tab-pane fade show active\" id=\"nav-darktheme\" role=\"tabpanel\" aria-labelledby=\"nav-darktheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>     <div class=\"tab-pane fade\" id=\"nav-lighttheme\" role=\"tabpanel\" aria-labelledby=\"nav-lighttheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>   </div>   <p>The styles used in these examples can be found <a href=\"../demo/files/unicauth-ui.css\">here</a>.</p> </section>  # Factor Authentication The call to authenticate the factor is similar to the [Login Authenticatication](#section/Login-Authentication), but you have to use the `data.factorUrl` returned from the [2FA creation](#operation/Create2FA).  ##### Calling the `factorUrl` After creating the factor authentication, you will receive the `factorUrl` to be opened by the user for his acceptance.<br>  ##### Data Return After the user accepts the factor authentication on Circle Auth App, the page will be redirected to the `returnUrl` with the [parameters](#operation/2FAWebhook) (check the [2FA creation](#operation/Create2FA) section for the `returnUrl` creation). <p>Here is one example of the redirected URL:</p> <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeRedirectedUrl2fa\" class=\"language-uri word-break\">https://circleaccess.circlesecurity.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session5mCrfGYEW7zJ68i7zwUhBuBxNiYpABobw</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authPT9zzReqtp5Sq4ogEaNmP1tsrtm1ssmsQ</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">twoFactor</span>&<span class=\"token tag\">customID</span>=<span class=\"token attr-value\">any-custom-data</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">69XzMPOPuAStHcMJub4LaC56u8cnYyiZH+C7cteIed0=</span></code></pre> </div> <p></p> 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: info@unicauth.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.26
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient.js';

/**
 * The Model2FARequestData model module.
 * @module model/Model2FARequestData
 * @version 1.0.0
 */
export class Model2FARequestData {
  /**
   * Constructs a new <code>Model2FARequestData</code>.
   * @alias module:model/Model2FARequestData
   * @class
   * @param customID {String} The customID parameter can be anything to track back to your system. Example: `session-123`
   * @param returnUrl {String} The return URL that will be used for redirection when the 2FA is accepted.
   * @param question {String} This is the question you will make to the user. Example: `Confirm 1 BTC withdrawal?`
   */
  constructor(customID, returnUrl, question) {
    this.customID = customID;
    this.returnUrl = returnUrl;
    this.question = question;
  }

  /**
   * Constructs a <code>Model2FARequestData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Model2FARequestData} obj Optional instance to populate.
   * @return {module:model/Model2FARequestData} The populated <code>Model2FARequestData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Model2FARequestData();
      if (data.hasOwnProperty('customID'))
        obj.customID = ApiClient.convertToType(data['customID'], 'String');
      if (data.hasOwnProperty('returnUrl'))
        obj.returnUrl = ApiClient.convertToType(data['returnUrl'], 'String');
      if (data.hasOwnProperty('webhookUrl'))
        obj.webhookUrl = ApiClient.convertToType(data['webhookUrl'], 'String');
      if (data.hasOwnProperty('phone'))
        obj.phone = ApiClient.convertToType(data['phone'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('question'))
        obj.question = ApiClient.convertToType(data['question'], 'String');
      if (data.hasOwnProperty('userID'))
        obj.userID = ApiClient.convertToType(data['userID'], 'String');
      if (data.hasOwnProperty('mobileReturnUrl'))
        obj.mobileReturnUrl = ApiClient.convertToType(data['mobileReturnUrl'], 'String');
    }
    return obj;
  }
}

/**
 * The customID parameter can be anything to track back to your system. Example: `session-123`
 * @member {String} customID
 */
Model2FARequestData.prototype.customID = undefined;

/**
 * The return URL that will be used for redirection when the 2FA is accepted.
 * @member {String} returnUrl
 */
Model2FARequestData.prototype.returnUrl = undefined;

/**
 * Webhook URL to send data when 2FA is accepted. Check out [2FA Webhook](#operation/2FAWebhook) for request specification.
 * @member {String} webhookUrl
 */
Model2FARequestData.prototype.webhookUrl = undefined;

/**
 * The phone number that you want the acceptance of the question. <br>Must start with `+` (plus sign) and the country code. <br>You cannot send the `email` and the `phone`, you have to send one or another.
 * @member {String} phone
 */
Model2FARequestData.prototype.phone = undefined;

/**
 * The e-mail address that you want the acceptance of the question. <br>You cannot send the `email` and the `phone`, you have to send one or another.
 * @member {String} email
 */
Model2FARequestData.prototype.email = undefined;

/**
 * This is the question you will make to the user. Example: `Confirm 1 BTC withdrawal?`
 * @member {String} question
 */
Model2FARequestData.prototype.question = undefined;

/**
 * The userID that you want the acceptance of the question. <br>If the user that scans the code is not the same as this `userID`, he will not be able to accept your question. <br>You don't need this parameter if you use the `email` or `phone`. But if you add this parameter, both checks (`userID` plus `email`/`phone`) will happen.
 * @member {String} userID
 */
Model2FARequestData.prototype.userID = undefined;

/**
 * This URL, with the [same parameters](#operation/2FAWebhook) as the `returnUrl` or `webhookUrl`, will be triggered by the user's app after his factor acceptance. This is usually done when making an app-to-app call. You can use, for example, `your_app://path` (Deep Link).
 * @member {String} mobileReturnUrl
 */
Model2FARequestData.prototype.mobileReturnUrl = undefined;

