"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nats_module_1 = require("./nats/nats.module");
const certificates_module_1 = require("./certificates/certificates.module");
const entrants_module_1 = require("./entrants/entrants.module");
const typeorm_1 = require("@nestjs/typeorm");
const entrant_entity_1 = require("./entrants/entities/entrant.entity");
const certificate_entity_1 = require("./certificates/entities/certificate.entity");
const specialties_module_1 = require("./specialties/specialties.module");
const speciality_entity_1 = require("./specialties/entities/speciality.entity");
const coefficient_entity_1 = require("./specialties/entities/coefficient.entity");
const applications_module_1 = require("./applications/applications.module");
const application_entity_1 = require("./applications/entities/application.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nats_module_1.NatsModule,
            certificates_module_1.CertificatesModule,
            entrants_module_1.EntrantsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'db',
                autoLoadEntities: true,
                synchronize: true,
                entities: [entrant_entity_1.Entrant, certificate_entity_1.Certificate, speciality_entity_1.Specialty, coefficient_entity_1.Coefficient, application_entity_1.Application],
            }),
            specialties_module_1.SpecialtiesModule,
            applications_module_1.ApplicationsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map