import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import { GoogleCredentials } from './google-credentials.interface';

export class FirebaseConfig {
  constructor(public credentials: GoogleCredentials) {}
}

export interface FirestoreOptionsFactory {
  createFirestoreOptions(): Promise<FirebaseConfig> | FirebaseConfig;
}

export function createFirestoreClient(options: Settings): Firestore {
  const client = new Firestore(options);
  return client;
}

export interface FirestoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<FirestoreOptionsFactory>;
  useClass?: Type<FirestoreOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<FirebaseConfig> | FirebaseConfig;
}
