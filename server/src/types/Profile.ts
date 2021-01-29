import { objectType } from 'nexus'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.location()
    t.model.website()
    t.model.avatar()
  },
})

