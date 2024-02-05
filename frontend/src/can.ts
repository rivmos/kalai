import { AbilityBuilder, createMongoAbility } from '@casl/ability'

/**
 * @param user contains details about logged in user: its id, name, email, etc
 */

type User = {
  userName?: string | undefined
  authority?: string[] | undefined
  avatar?: string | undefined
  email?: string | undefined
  token?: string | undefined
  remember?: boolean | undefined
}


const permissions = ["read_BlogPost", "manage_BlogPost"]

console.log(localStorage.getItem('user'))

/* export function defineAbilitiesFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    permissions.forEach((p) => {
      let per = p.split("_");
      can(per[0], per[1]);
  });

  // if (user?.authority?.includes("admin")) {
  //   can('read', 'adminData');
  //   can('read', 'BlogPost');
  // }
  // if (user?.authority?.includes('user')) {
  //   can('read', 'userData')
  // }

  // can read blog posts
  //   can('read', 'BlogPost');
  // can manage (i.e., do anything) own posts
  //   can('manage', 'BlogPost', { author: user.id });
  // cannot delete a post if it was created more than a day ago
  //   cannot('delete', 'BlogPost', {
  //     createdAt: { $lt: Date.now() - 24 * 60 * 60 * 1000 }
  //   });

  return build();
}; */