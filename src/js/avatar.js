const isUrl = input => input.startsWith('http')

const formatIconUrl = input =>
      isUrl(input) ? input : `https://bestof.js.org/logos/${input}`

const formatOwnerAvatar = (owner_id, size) =>
      `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=${size}`

const getProjectAvatarUrl = (project, size) =>{
      if (project.logo){
          return project.logo
      }
      return project.icon
          ? formatIconUrl(project.icon)
          : formatOwnerAvatar(project.owner_id, size)
}

export {
    getProjectAvatarUrl
}
