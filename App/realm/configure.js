/**
 * @flow
 */

'use strict';

import Realm from 'realm';
import Schema from './schema/schema';

function configureRealm() {
  let schema = new Schema();

  let next = Realm.schemaVersion(Realm.defaultPath);
  if (next > 0) {
    while (next < schema.schemas.length) {
      let migratedSchema = schema.schemas[next++];
      let migratedRealm = new Realm(migratedSchema);
      migratedRealm.close();
    }
  }

  console.log("configureRealm Start & migration complete");

  let current = schema.current();
  let realm = new Realm(current);
  realm.close();
}

module.exports = configureRealm;
