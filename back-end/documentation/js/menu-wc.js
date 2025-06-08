'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' :
                                            'id="xs-controllers-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' :
                                        'id="xs-injectables-links-module-AppModule-d61bfec215db1bc428f5a809e50ba12013237315b0262e1351d622189f27af6b32231ef252bdaf4e7cdcc69d525bdc30e3cbb3b61fcd4d796135b8147d70840f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppointmentsModule.html" data-type="entity-link" >AppointmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' : 'data-bs-target="#xs-controllers-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' :
                                            'id="xs-controllers-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' }>
                                            <li class="link">
                                                <a href="controllers/AppointmentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' : 'data-bs-target="#xs-injectables-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' :
                                        'id="xs-injectables-links-module-AppointmentsModule-58adca4856f557ec69eafa1c8e8bf95487a6b1129b792b8096b677a903ac90314a9d0d48056e4607eb540e035940bff7d3d69fa95b08823c99733770fad9b384"' }>
                                        <li class="link">
                                            <a href="injectables/AppointmentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticlesClientsModule.html" data-type="entity-link" >ArticlesClientsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' : 'data-bs-target="#xs-controllers-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' :
                                            'id="xs-controllers-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' }>
                                            <li class="link">
                                                <a href="controllers/ArticlesClientsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesClientsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' : 'data-bs-target="#xs-injectables-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' :
                                        'id="xs-injectables-links-module-ArticlesClientsModule-d8ec114fdfc0809929807f4e8f38185541e60b294736165304ab5f2f8432839696efcfe766202c9e768bb24633e270da5da06d0f8b599d0422470c8679eea1c1"' }>
                                        <li class="link">
                                            <a href="injectables/ArticlesClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesClientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticlesModule.html" data-type="entity-link" >ArticlesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' : 'data-bs-target="#xs-controllers-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' :
                                            'id="xs-controllers-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' }>
                                            <li class="link">
                                                <a href="controllers/ArticlesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' : 'data-bs-target="#xs-injectables-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' :
                                        'id="xs-injectables-links-module-ArticlesModule-5161f7ca659c4cbff1da2e8536fb89b072f4c11dcf091da0a516a04eb63578866799a942a91666e4d84563de5551e5346412261d9f26bbdf169a777419585481"' }>
                                        <li class="link">
                                            <a href="injectables/ArticlesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticlesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' :
                                            'id="xs-controllers-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' :
                                        'id="xs-injectables-links-module-AuthModule-5d8254b6b8e4776b79903f0c4807d1131a0da7cfd7a66c41d6a36f61476084e619e73dd1ef226ab8485a1d8a0948774ef06068e146c93e559613e961910301ed"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientsModule.html" data-type="entity-link" >ClientsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' : 'data-bs-target="#xs-controllers-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' :
                                            'id="xs-controllers-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' }>
                                            <li class="link">
                                                <a href="controllers/ClientsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' : 'data-bs-target="#xs-injectables-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' :
                                        'id="xs-injectables-links-module-ClientsModule-bb37fa1256812050348c9378b07a1053613d10aaf536bd16b778370fc65dd458e608b0243ed46ec2f71287e2f6882061c2de5276fab0ce0ff56bb028c816aaef"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoriqueConnexionModule.html" data-type="entity-link" >HistoriqueConnexionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' : 'data-bs-target="#xs-controllers-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' :
                                            'id="xs-controllers-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' }>
                                            <li class="link">
                                                <a href="controllers/HistoriqueConnexionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoriqueConnexionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' : 'data-bs-target="#xs-injectables-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' :
                                        'id="xs-injectables-links-module-HistoriqueConnexionModule-5b4b4dcbcaf0caf7b9629f50e4008bed5b095b6b1cb438cd0a6e7812965d4eb21fe574f3a22f78bf0b94e63ffcb399bb098cca97fed9e3cee1c13655d41a5243"' }>
                                        <li class="link">
                                            <a href="injectables/HistoriqueConnexionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoriqueConnexionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppointmentsController.html" data-type="entity-link" >AppointmentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ArticlesClientsController.html" data-type="entity-link" >ArticlesClientsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ArticlesController.html" data-type="entity-link" >ArticlesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientsController.html" data-type="entity-link" >ClientsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HistoriqueConnexionController.html" data-type="entity-link" >HistoriqueConnexionController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Appointments.html" data-type="entity-link" >Appointments</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Articles.html" data-type="entity-link" >Articles</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ArticlesClients.html" data-type="entity-link" >ArticlesClients</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Auth.html" data-type="entity-link" >Auth</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Clients.html" data-type="entity-link" >Clients</a>
                                </li>
                                <li class="link">
                                    <a href="entities/HistoriqueConnexion.html" data-type="entity-link" >HistoriqueConnexion</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentsService.html" data-type="entity-link" >AppointmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticlesClientsService.html" data-type="entity-link" >ArticlesClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticlesService.html" data-type="entity-link" >ArticlesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientsService.html" data-type="entity-link" >ClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoriqueConnexionService.html" data-type="entity-link" >HistoriqueConnexionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});