export const MenuItems = [
  {
    title: 'Overall',
    url: '/overview/:project_id/:member_id',
    cName: 'nav-links'
  },
  {
    title: 'Code Contribution',
    url: '/overview/:project_id/:member_id/CodeContribution',
    cName: 'nav-links'
  },
  {
    title: 'Issue Contribution',
    url: '/overview/:project_id/:member_id/issueContribution',
    cName: 'nav-links'
  },
  {
    title: 'Comment Contribution',
    url: '/overview/:project_id/:member_id/CommentContribution',
    cName: 'nav-links'
  },
  {
    title: 'Sign Out',
    url: '/overview/:project_id/:member_id/*',
    cName: 'nav-links-mobile'
  },
]
