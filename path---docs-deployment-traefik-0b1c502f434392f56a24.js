webpackJsonp([61111918180622],{476:function(e,t){e.exports={pathContext:{editPath:"deployment/traefik.md",html:'<h1 id="implement-traefik-into-api-platform-dockerized"><a href="#implement-traefik-into-api-platform-dockerized" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Implement Traefik Into API Platform Dockerized</h1>\n<h2 id="basic-implementation"><a href="#basic-implementation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Basic Implementation</h2>\n<p><a href="https://traefik.io" target="_blank" rel="nofollow noopener noreferrer">Traefik</a> is a reverse proxy / load balancer that\'s easy, dynamic, automatic, fast, full-featured, open source, production proven, providing metrics, and integrating with every major cluster technology.</p>\n<p>This tool will help you to define your own routes for your client, api and more generally for your containers.</p>\n<p>Use this custom API Platform <code class="language-text">docker-compose.yml</code> file which implements ready-to-use Traefik container configuration.<br>\nOverride ports and add labels to tell Traefik to listen the routes mentionned and redirect routes to specified container.</p>\n<p><code class="language-text">--api</code> Tell Traefik to generate a browser view to watch containers and IP/DNS associated easier<br>\n<code class="language-text">--docker</code> Tell Traefik to listen docker api<br>\n<code class="language-text">--docker.domain=localhost</code> The main DNS will be on localhost<br>\n<code class="language-text">labels:</code> Key for Traefik configuration into Docker integration  </p>\n<div class="gatsby-highlight" data-language="yaml">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">services</span><span class="token punctuation">:</span>\n<span class="token comment">#  ...</span>\n  <span class="token key atrule">api</span><span class="token punctuation">:</span>\n    <span class="token key atrule">labels</span><span class="token punctuation">:</span> \n      <span class="token punctuation">-</span> <span class="token string">"traefik.frontend.rule=Host:api.localhost"</span></code></pre>\n      </div>\n<p>The api DNS will be specified with <code class="language-text">traefik.frontend.rule=Host:your.host</code> (here api.localhost)  </p>\n<p><code class="language-text">--traefik.port=3000</code> Port specified to Traefik will be exopsed by container (here React app expose the 3000 port)  </p>\n<div class="gatsby-highlight" data-language="yaml">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">\'3.4\'</span>\n\n<span class="token key atrule">services</span><span class="token punctuation">:</span>\n  <span class="token key atrule">reverse-proxy</span><span class="token punctuation">:</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> traefik\n    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>api <span class="token punctuation">-</span><span class="token punctuation">-</span>docker <span class="token punctuation">-</span><span class="token punctuation">-</span>docker.domain=localhost\n    <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> "80<span class="token punctuation">:</span>80" <span class="token comment">#All HTTP access will be caught by Traefik</span>\n      <span class="token punctuation">-</span> "8080<span class="token punctuation">:</span>8080" <span class="token comment">#Access Traefik webview</span>\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock\n\n  <span class="token key atrule">php</span><span class="token punctuation">:</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>CONTAINER_REGISTRY_BASE<span class="token punctuation">}</span>/php\n    <span class="token key atrule">build</span><span class="token punctuation">:</span>\n      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./api\n    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> db\n    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ./api/.env\n    <span class="token comment"># Comment out these volumes in production</span>\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ./api<span class="token punctuation">:</span>/srv/api<span class="token punctuation">:</span>rw<span class="token punctuation">,</span>cached\n      <span class="token comment"># If you develop on Linux, uncomment the following line to use a bind-mounted host directory instead</span>\n      <span class="token comment"># - ./api/var:/srv/api/var:rw</span>\n\n  <span class="token key atrule">api</span><span class="token punctuation">:</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>CONTAINER_REGISTRY_BASE<span class="token punctuation">}</span>/nginx\n    <span class="token key atrule">labels</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">"traefik.frontend.rule=Host:api.localhost"</span>\n    <span class="token key atrule">build</span><span class="token punctuation">:</span>\n      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./api\n    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> php\n    <span class="token comment"># Comment out this volume in production</span>\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ./api/public<span class="token punctuation">:</span>/srv/api/public<span class="token punctuation">:</span>ro\n\n  <span class="token key atrule">db</span><span class="token punctuation">:</span>\n    <span class="token comment"># In production, you may want to use a managed database service</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span>9.6<span class="token punctuation">-</span>alpine\n    <span class="token key atrule">labels</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">"traefik.frontend.rule=Host:db.localhost"</span>\n    <span class="token key atrule">environment</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> POSTGRES_DB=api\n      <span class="token punctuation">-</span> POSTGRES_USER=api<span class="token punctuation">-</span>platform\n      <span class="token comment"># You should definitely change the password in production</span>\n      <span class="token punctuation">-</span> POSTGRES_PASSWORD=<span class="token tag">!ChangeMe!</span>\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> db<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/postgresql/data<span class="token punctuation">:</span>rw\n      <span class="token comment"># You may use a bind-mounted host directory instead, so that it is harder to accidentally remove the volume and lose all your data!</span>\n      <span class="token comment"># - ./docker/db/data:/var/lib/postgresql/data:rw</span>\n    <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">"5432:5432"</span>\n\n  <span class="token key atrule">client</span><span class="token punctuation">:</span>\n    <span class="token comment"># Use a static website hosting service in production</span>\n    <span class="token comment"># See https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.mddeployment</span>\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>CONTAINER_REGISTRY_BASE<span class="token punctuation">}</span>/client\n    <span class="token key atrule">build</span><span class="token punctuation">:</span>\n      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./client\n    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ./client/.env\n    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ./client<span class="token punctuation">:</span>/usr/src/client<span class="token punctuation">:</span>rw<span class="token punctuation">,</span>cached\n      <span class="token punctuation">-</span> /usr/src/client/node_modules\n    <span class="token key atrule">expose</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token number">3000</span>\n    <span class="token key atrule">labels</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token string">"traefik.port=3000"</span>\n      <span class="token punctuation">-</span> <span class="token string">"traefik.frontend.rule=Host:localhost"</span>\n\n<span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n  <span class="token key atrule">db-data</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Don\'t forget the db-data, then database won\'t work in this dockerized solution.</p>\n<p><code class="language-text">localhost</code> is a reserved domain referred in your <code class="language-text">/etc/hosts</code>.\nIf you want to implement custom DNS such as production DNS in local, just put them at the end of your <code class="language-text">/etc/host</code> file like that: </p>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text"># /etc/hosts\n# ...\n\n127.0.0.1       your.domain.com</code></pre>\n      </div>\n<p>If you do that, you\'ll have to update the <code class="language-text">CORS_ALLOW_ORIGIN</code> environment variable <code class="language-text">api/.env</code> to accept the specified URL.</p>\n<h2 id="known-issues"><a href="#known-issues" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Known Issues</h2>\n<p>If your network is of type B, it may conflict with the traefik sub-network.</p>',nav:[{title:"The Distribution: Create Powerful APIs with Ease",path:"distribution",items:[{id:"index",title:"Getting Started with API Platform: Hypermedia and GraphQL API, Admin and Progressive Web App",anchors:[{id:"installing-the-framework",title:"Installing the Framework",anchors:[{id:"using-the-official-distribution-recommended",title:"Using the Official Distribution (recommended)"},{id:"using-symfony-flex-and-composer-advanced-users",title:"Using Symfony Flex and Composer (advanced users)"}]},{id:"its-ready",title:"It's Ready!"},{id:"bringing-your-own-model",title:"Bringing your Own Model"},{id:"validating-data",title:"Validating Data"},{id:"adding-graphql-support",title:"Adding GraphQL Support"},{id:"the-admin",title:"The Admin"},{id:"a-reactredux-progressive-web-app",title:"A React/Redux Progressive Web App"},{id:"other-features",title:"Other Features"}]},{id:"testing",title:"Testing and Specifying the API",anchors:[{id:"running-unit-tests-with-phpunit",title:"Running Unit Tests with PHPUnit"}]},{id:"debugging",title:"Debugging",anchors:[{id:"add-a-development-stage-to-the-dockerfile",title:"Add a Development Stage to the Dockerfile"},{id:"configure-xdebug-with-docker-compose-override",title:"Configure Xdebug with Docker Compose Override"},{id:"troubleshooting",title:"Troubleshooting"}]}]},{title:"The API Component",path:"core",items:[{id:"index",title:"The API Platform Core Library",anchors:[{id:"features",title:"Features"},{id:"other-resources",title:"Other resources"}]},{id:"getting-started",title:"Getting started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"design",title:"General Design Considerations"},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations",anchors:[{id:"prefixing-all-routes-of-all-operations",title:"Prefixing All Routes of All Operations"}]},{id:"subresources",title:"Subresources",anchors:[{id:"control-the-path-of-subresources",title:"Control the Path of Subresources"},{id:"access-control-of-subresources",title:"Access Control of Subresources"},{id:"control-the-depth-of-subresources",title:"Control the Depth of Subresources"}]},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers",anchors:[{id:"recommended-method",title:"Recommended Method",anchors:[{id:"serialization-groups",title:"Serialization Groups"},{id:"entity-retrieval",title:"Entity Retrieval"}]},{id:"alternative-method",title:"Alternative Method"}]}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"},{id:"filters",title:"Filters",anchors:[{id:"filtering-on-nested-properties",title:"Filtering on Nested Properties"}]},{id:"security-access_control",title:"Security (access_control)"},{id:"serialization-groups-1",title:"Serialization Groups"}]},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-and-mongodb-odm-filters",title:"Doctrine ORM and MongoDB ODM Filters",anchors:[{id:"basic-knowledge",title:"Basic Knowledge"},{id:"search-filter",title:"Search Filter"},{id:"date-filter",title:"Date Filter",anchors:[{id:"managing-null-values",title:"Managing null Values"}]},{id:"boolean-filter",title:"Boolean Filter"},{id:"numeric-filter",title:"Numeric Filter"},{id:"range-filter",title:"Range Filter"},{id:"exists-filter",title:"Exists Filter"},{id:"order-filter-sorting",title:"Order Filter (Sorting)",anchors:[{id:"comparing-with-null-values",title:"Comparing with Null Values"},{id:"using-a-custom-order-query-parameter-name",title:"Using a Custom Order Query Parameter Name"}]},{id:"filtering-on-nested-properties-1",title:"Filtering on Nested Properties"},{id:"enabling-a-filter-for-all-properties-of-a-resource",title:"Enabling a Filter for All Properties of a Resource"}]},{id:"elasticsearch-filters",title:"Elasticsearch Filters",anchors:[{id:"ordering-filter-sorting",title:"Ordering Filter (Sorting)",anchors:[{id:"using-a-custom-order-query-parameter-name-1",title:"Using a Custom Order Query Parameter Name"}]},{id:"match-filter",title:"Match Filter"},{id:"term-filter",title:"Term Filter"},{id:"filtering-on-nested-properties-2",title:"Filtering on Nested Properties"}]},{id:"serializer-filters",title:"Serializer Filters",anchors:[{id:"group-filter",title:"Group Filter"},{id:"property-filter",title:"Property filter"}]},{id:"creating-custom-filters",title:"Creating Custom Filters",anchors:[{id:"creating-custom-doctrine-orm-filters",title:"Creating Custom Doctrine ORM Filters"},{id:"creating-custom-doctrine-mongodb-odm-filters",title:"Creating Custom Doctrine MongoDB ODM Filters"},{id:"creating-custom-elasticsearch-filters",title:"Creating Custom Elasticsearch Filters"},{id:"using-doctrine-orm-filters",title:"Using Doctrine ORM Filters"}]},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations",anchors:[{id:"configuration",title:"Configuration"}]},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-serialization-groups-per-operation",title:"Using Serialization Groups per Operation",anchors:[{id:"embedding-relations",title:"Embedding Relations"},{id:"denormalization",title:"Denormalization"}]},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per-item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-adding-extra-data",title:"Decorating a Serializer and Adding Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"validating-submitted-data",title:"Validating Submitted Data"},{id:"using-validation-groups",title:"Using Validation Groups"},{id:"using-validation-groups-on-operations",title:"Using Validation Groups on Operations"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"security",title:"Security",anchors:[{id:"configuring-the-access-control-message",title:"Configuring the Access Control Message"}]},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:"Injecting the Serializer in an ItemDataProvider"},{id:"injecting-extensions-pagination-filter-eagerloading-etc",title:"Injecting Extensions (Pagination, Filter, EagerLoading etc.)"}]},{id:"data-persisters",title:"Data Persisters",anchors:[{id:"creating-a-custom-data-persister",title:"Creating a Custom Data Persister"}]},{id:"mercure",title:"Pushing Live Updates Using the Mercure Protocol",anchors:[{id:"installing-the-mercure-support",title:"Installing the Mercure Support"},{id:"pushing-the-api-updates",title:"Pushing the API Updates"},{id:"dispatching-private-updates-authorized-mode",title:"Dispatching Private Updates (Authorized Mode)"}]},{id:"elasticsearch",title:"Elasticsearch Support",anchors:[{id:"overview",title:"Overview"},{id:"enabling-reading-support",title:"Enabling reading support"},{id:"creating-models",title:"Creating models",anchors:[{id:"creating-custom-mapping",title:"Creating custom mapping"}]},{id:"filtering",title:"Filtering"},{id:"creating-custom-extensions",title:"Creating custom extensions"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination",anchors:[{id:"globally",title:"Globally"},{id:"for-a-specific-resource",title:"For a Specific Resource"},{id:"client-side",title:"Client-side",anchors:[{id:"globally-1",title:"Globally"},{id:"for-a-specific-resource-1",title:"For a specific resource"}]}]},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page",anchors:[{id:"globally-2",title:"Globally"},{id:"for-a-specific-resource-2",title:"For a Specific Resource"},{id:"client-side-1",title:"Client-side",anchors:[{id:"globally-3",title:"Globally"},{id:"for-a-specific-resource-3",title:"For a Specific Resource"}]}]},{id:"changing-maximum-items-per-page",title:"Changing Maximum items per page",anchors:[{id:"globally-4",title:"Globally"},{id:"for-a-specific-resource-4",title:"For a Specific Resource"},{id:"for-a-specific-resource-collection-operation",title:"For a Specific Resource Collection Operation"}]},{id:"partial-pagination",title:"Partial Pagination",anchors:[{id:"globally-5",title:"Globally"},{id:"for-a-specific-resource-5",title:"For a Specific Resource"},{id:"client-side-2",title:"Client-side",anchors:[{id:"globally-6",title:"Globally"},{id:"for-a-specific-resource-6",title:"For a Specific Resource"}]}]},{id:"avoiding-double-sql-requests-on-doctrine-orm",title:"Avoiding double SQL requests on Doctrine ORM"},{id:"custom-controller-action",title:"Custom Controller Action"}]},{id:"events",title:"The Event System"},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"enabling-additional-formats-on-a-specific-resourceoperation",title:"Enabling Additional Formats On a Specific Resource/Operation"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"deprecations",title:"Deprecating Resources and Properties (Alternative to Versioning)",anchors:[{id:"deprecating-resource-classes-operations-and-properties",title:"Deprecating Resource Classes, Operations and Properties"},{id:"setting-the-sunset-http-header-to-indicate-when-a-resource-or-an-operation-will-be-removed",title:"Setting the Sunset HTTP Header to Indicate When a Resource or an Operation Will Be Removed"}]},{id:"performance",title:"Performance and Cache",anchors:[{id:"enabling-the-built-in-http-cache-invalidation-system",title:"Enabling the Built-in HTTP Cache Invalidation System",anchors:[{id:"extending-cache-tags-for-invalidation",title:"Extending Cache-Tags for invalidation"}]},{id:"setting-custom-http-cache-headers",title:"Setting Custom HTTP Cache Headers"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes",anchors:[{id:"search-filter-1",title:"Search Filter"},{id:"eager-loading",title:"Eager Loading",anchors:[{id:"max-joins",title:"Max Joins"},{id:"force-eager",title:"Force Eager"},{id:"override-at-resource-and-operation-level",title:"Override at Resource and Operation Level"},{id:"disable-eager-loading",title:"Disable Eager Loading"}]},{id:"partial-pagination-1",title:"Partial Pagination"}]},{id:"profiling-with-blackfireio",title:"Profiling with Blackfire.io"}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-doctrine-orm-extension",title:"Custom Doctrine ORM Extension",anchors:[{id:"example",title:"Example",anchors:[{id:"blocking-anonymous-users",title:"Blocking Anonymous Users"}]}]},{id:"custom-doctrine-mongodb-odm-extension",title:"Custom Doctrine MongoDB ODM Extension"},{id:"custom-elasticsearch-extension",title:"Custom Elasticsearch Extension"}]},{id:"swagger",title:"OpenAPI Specification Support (formerly Swagger)",anchors:[{id:"using-the-openapi-command",title:"Using the OpenAPI Command"},{id:"overriding-the-openapi-specification",title:"Overriding the OpenAPI Specification"},{id:"using-the-openapi-and-swagger-contexts",title:"Using the OpenAPI and Swagger Contexts"},{id:"changing-the-name-of-a-definition",title:"Changing the Name of a Definition"},{id:"changing-operations-in-the-openapi-documentation",title:"Changing Operations in the OpenAPI Documentation"},{id:"changing-the-location-of-swagger-ui",title:"Changing the Location of Swagger UI",anchors:[{id:"disabling-swagger-ui-or-of-redoc",title:"Disabling Swagger UI or of ReDoc"},{id:"manually-registering-the-swagger-ui-controller",title:"Manually Registering the Swagger UI Controller"}]},{id:"overriding-the-ui-template",title:"Overriding the UI Template"},{id:"compatibilily-layer-with-amazon-api-gateway",title:"Compatibilily Layer with Amazon API Gateway"}]},{id:"messenger",title:"Symfony Messenger Integration: CQRS and Async Message Processing",anchors:[{id:"installing-symfony-messenger",title:"Installing Symfony Messenger"},{id:"dispatching-a-resource-through-the-message-bus",title:"Dispatching a Resource through the Message Bus"},{id:"registering-a-message-handler",title:"Registering a Message Handler"},{id:"accessing-to-the-data-returned-by-the-handler",title:"Accessing to the Data Returned by the Handler"},{id:"detecting-removals",title:"Detecting Removals"}]},{id:"dto",title:"Using Data Transfer Objects (DTOs)",anchors:[{id:"specifying-an-input-or-an-output-class",title:"Specifying an Input or an Output Class"},{id:"disabling-the-input-or-the-output",title:"Disabling the Input or the Output"},{id:"creating-a-service-oriented-endpoint",title:"Creating a Service-Oriented endpoint"}]},{id:"push-relations",title:"Pushing Related Resources Using HTTP/2"},{id:"file-upload",title:"Handling File Upload",anchors:[{id:"installing-vichuploaderbundle",title:"Installing VichUploaderBundle"},{id:"configuring-the-entity-receiving-the-uploaded-file",title:"Configuring the Entity Receiving the Uploaded File"},{id:"handling-file-upload",title:"Handling File Upload"},{id:"making-a-request-to-the-media_objects-endpoint",title:"Making a Request to the /media_objects Endpoint"},{id:"linking-a-mediaobject-resource-to-another-resource",title:"Linking a MediaObject Resource to Another Resource"}]},{id:"default-order",title:"Overriding Default Order"},{id:"errors",title:"Errors Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"external-vocabularies",title:"Using External Vocabularies"},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration-1",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Resolver",anchors:[{id:"defining-the-operation-path-resolver",title:"Defining the Operation Path Resolver"},{id:"registering-the-service",title:"Registering the Service"},{id:"configure-it",title:"Configure It"}]}]},{id:"extending-jsonld-context",title:"Extending JSON-LD context"},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:[{id:"create-your-deserializelistener-decorator",title:"Create your DeserializeListener Decorator"},{id:"creating-the-service-definition",title:"Creating the Service Definition"}]},{id:"identifiers",title:"Identifiers",anchors:[{id:"custom-identifier-normalizer",title:"Custom identifier normalizer"},{id:"supported-identifiers",title:"Supported identifiers"}]},{id:"jwt",title:"JWT Authentication",anchors:[{id:"installing-lexikjwtauthenticationbundle",title:"Installing LexikJWTAuthenticationBundle"},{id:"documenting-the-authentication-mechanism-with-swaggeropen-api",title:"Documenting the Authentication Mechanism with Swagger/Open API",anchors:[{id:"configuring-api-platform",title:"Configuring API Platform"},{id:"adding-a-new-api-key",title:"Adding a New API Key"}]},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:"Creating a User Entity with Serialization Groups"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle Integration"},{id:"configuration",title:"Configuration"}]},{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"The schema generator",anchors:[{id:"what-is-schemaorg",title:"What is Schema.org?"},{id:"why-use-schemaorg-data-to-generate-a-php-model",title:"Why use Schema.org data to generate a PHP model?",anchors:[{id:"dont-reinvent-the-wheel",title:"Don't Reinvent The Wheel"},{id:"improve-seo-and-user-experience",title:"Improve SEO and user experience"},{id:"be-ready-for-the-future",title:"Be ready for the future"}]},{id:"documentation",title:"Documentation"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"model-scaffolding",title:"Model Scaffolding",anchors:[{id:"going-further",title:"Going Further"}]},{id:"cardinality-extraction",title:"Cardinality Extraction"}]},{id:"configuration",title:"Configuration",anchors:[{id:"customizing-php-namespaces",title:"Customizing PHP Namespaces"},{id:"forcing-a-field-range",title:"Forcing a Field Range"},{id:"forcing-a-field-cardinality",title:"Forcing a Field Cardinality"},{id:"forcing-a-relation-table-name",title:"Forcing a Relation Table Name"},{id:"forcing-or-disabling-a-class-parent",title:"Forcing (or Disabling) a Class Parent"},{id:"forcing-a-class-to-be-abstract",title:"Forcing a Class to be Abstract"},{id:"forcing-a-nullable-property",title:"Forcing a Nullable Property"},{id:"forcing-a-unique-property",title:"Forcing a Unique Property"},{id:"making-a-property-read-only",title:"Making a Property Read Only"},{id:"making-a-property-write-only",title:"Making a Property Write Only"},{id:"forcing-a-property-to-be-in-a-serialization-group",title:"Forcing a Property to be in a Serialization Group"},{id:"forcing-an-embeddable-class-to-be-embedded",title:"Forcing an Embeddable Class to be Embedded"},{id:"author-phpdoc",title:"Author PHPDoc"},{id:"disabling-generators-and-creating-custom-ones",title:"Disabling Generators and Creating Custom Ones"},{id:"skipping-accessor-method-generation",title:"Skipping Accessor Method Generation"},{id:"disabling-the-id-generator",title:"Disabling the id Generator"},{id:"generating-uuids",title:"Generating UUIDs"},{id:"user-submitted-uuids",title:"User submitted UUIDs"},{id:"generating-custom-ids",title:"Generating Custom IDs"},{id:"disabling-usage-of-doctrine-collection",title:"Disabling Usage of Doctrine Collection"},{id:"changing-the-field-visibility",title:"Changing the Field Visibility"},{id:"generating-asserttype-annotations",title:"Generating @Assert\\Type Annotations"},{id:"forcing-doctrine-inheritance-mapping-annotation",title:"Forcing Doctrine Inheritance Mapping Annotation"},{id:"interfaces-and-doctrine-resolve-target-entity-listener",title:"Interfaces and Doctrine Resolve Target Entity Listener"
},{id:"custom-schemas",title:"Custom Schemas"},{id:"checking-goodrelation-compatibility",title:"Checking GoodRelation Compatibility"},{id:"php-file-header",title:"PHP File Header"},{id:"full-configuration-reference",title:"Full Configuration Reference"}]}]},{title:"The Admin Component",path:"admin",items:[{id:"index",title:"The API Platform Admin",anchors:[{id:"features-1",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation-1",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin",anchors:[{id:"using-custom-components",title:"Using Custom Components"},{id:"managing-files-and-images",title:"Managing Files and Images"},{id:"using-a-custom-validation-function-or-inject-custom-props",title:"Using a Custom Validation Function or Inject Custom Props"},{id:"using-the-hydra-data-provider-directly-with-react-admin",title:"Using the Hydra Data Provider Directly with react-admin"}]}]},{id:"authentication-support",title:"Authentication Support"},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"customizing-a-property",title:"Customizing a Property"},{id:"customizing-an-icon",title:"Customizing an Icon"},{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]},{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"The API Platform Client Generator",anchors:[{id:"features-2",title:"Features"}]},{id:"react",title:"React Generator",anchors:[{id:"install",title:"Install"},{id:"generating-a-progressive-web-app",title:"Generating a Progressive Web App"},{id:"screenshots",title:"Screenshots"}]},{id:"vuejs",title:"Vue.js Generator"},{id:"react-native",title:"React Native generator",anchors:[{id:"install-1",title:"Install"},{id:"generating-a-native-app",title:"Generating a Native App"},{id:"screenshots-in-ios-simulator",title:"Screenshots in iOS Simulator"}]},{id:"troubleshooting",title:"Troubleshooting"}]},{title:"Deployment",path:"deployment",items:[{id:"index",title:"Deploying API Platform Applications"},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:[{id:"preparing-your-cluster-and-your-local-machine",title:"Preparing Your Cluster and Your Local Machine"},{id:"creating-and-publishing-the-docker-images",title:"Creating and Publishing the Docker Images"},{id:"deploying",title:"Deploying"},{id:"initializing-the-database",title:"Initializing the Database"},{id:"tiller-rbac-issue",title:"Tiller RBAC Issue"}]},{id:"heroku",title:"Deploying an API Platform App on Heroku"},{id:"traefik",title:"Implement Traefik Into API Platform Dockerized",anchors:[{id:"basic-implementation",title:"Basic Implementation"},{id:"known-issues",title:"Known Issues"}]}]},{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process"},{id:"philosophy",title:"API Platform's Philosophy"},{id:"troubleshooting",title:"Troubleshooting",anchors:[{id:"using-docker",title:"Using Docker",anchors:[{id:"with-docker-toolbox-on-windows",title:"With Docker Toolbox on Windows"},{id:"error-starting-userland-proxy",title:"Error starting userland proxy"}]},{id:"using-api-platform-and-jms-serializer-in-the-same-project",title:"Using API Platform and JMS Serializer in the same project"},{id:"upstream-sent-too-big-header-while-reading-response-header-from-upstream-502-error",title:'"upstream sent too big header while reading response header from upstream" 502 Error'}]},{id:"contribution-guides",title:"Contribution guides"},{id:"conduct",title:"Contributor Code of Conduct"}]}]}}}});
//# sourceMappingURL=path---docs-deployment-traefik-0b1c502f434392f56a24.js.map