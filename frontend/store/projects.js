import ProjectService from '@/services/project.service'

export const state = () => ({
  projects: [],
  selected: [],
  current: {},
  loading: false
})

export const getters = {
  isDeletable(state) {
    const isProjectAdministrator = project => project.current_users_role.is_project_admin
    return state.selected.length > 0 && state.selected.every(isProjectAdministrator)
  },
  isEmpty(state) {
    return Object.keys(state.current).length === 0 && state.current.constructor === Object
  },
  currentProject(state) {
    return state.current
  },
  getCurrentUserRole(state) {
    return state.current.current_users_role || {}
  },
  canViewApproveButton(state) {
    const role = state.current.current_users_role
    console.log(role)
    return role && !role.is_annotator
  },
  getFilterOption(state) {
      return 'seq_annotations__isnull'
  },
  getLink(state) {
    return 'sequence-labeling'
  },
  getImportFormat(state) {
    const plain = {
      type: 'plain',
      text: 'TXT',
      accept: '.txt',
      examples: [
        'EU rejects German call to boycott British lamb.\n',
        'Peter Blackburn\n',
        'President Obama'
      ]
    }
    const csv = {
      type: 'csv',
      text: 'CSV',
      accept: '.csv'
    }
    const json = {
      type: 'json',
      text: 'JSONL',
      accept: '.json,.jsonl'
    }
    const conll = {
      type: 'conll',
      text: 'CoNLL',
      accept: '.conll'
    }
    const excel = {
      type: 'excel',
      text: 'Excel',
      accept: '.xlsx'
    }
    
    json.examples = [
      '{"text": "EU rejects German call to boycott British lamb.", "labels": [ [0, 2, "ORG"], [11, 17, "MISC"], ... ]}\n',
      '{"text": "Peter Blackburn", "labels": [ [0, 15, "PERSON"] ]}\n',
      '{"text": "President Obama", "labels": [ [10, 15, "PERSON"] ]}'
    ]
    conll.examples = [
      'EU\tB-ORG\n',
      'rejects\tO\n',
      'German\tB-MISC\n',
      'call\tO\n',
      'to\tO\n',
      'boycott\tO\n',
      'British\tB-MISC\n',
      'lamb\tO\n',
      '.\tO\n\n',
      'Peter\tB-PER\n',
      'Blackburn\tI-PER'
    ]

    return [
      plain,
      json,
      conll
    ]

  },
  getExportFormat(state) {
    const csv = {
      type: 'csv',
      text: 'CSV'
    }
    const json = {
      type: 'json',
      text: 'JSONL'
    }
    const jsonl = {
      type: 'json1',
      text: 'JSONL(Text label)'
    }
    
    json.examples = [
      '{"id": 1, "text": "EU rejects ...", "annotations": [{"id": 1, "label": 2, "start_offset": 0, "end_offset": 2, "user": 1}]}\n',
      '{"id": 2, "text": "Peter Blackburn", "annotations": [{"id": 2, "label": 1, "start_offset": 0, "end_offset": 15, "user": 1}]}\n',
      '{"id": 3, "text": "President Obama", "annotations": [{"id": 3, "label": 1, "start_offset": 10, "end_offset": 15, "user": 1}]}'
    ]
    jsonl.examples = [
      '{"id": 1, "text": "EU rejects ...", "labels": [[0,2,"ORG"], [11,17, "MISC"], [34,41,"ORG"]]}\n',
      '{"id": 2, "text": "Peter Blackburn", "labels": [[0, 15, "PERSON"]]}\n',
      '{"id": 3, "text": "President Obama", "labels": [[10, 15, "PERSON"]]}\n'
    ]
    return [
      json,
      jsonl
    ]
   
  },
  loadSearchOptions(state) {
    const checkpoint = JSON.parse(localStorage.getItem('checkpoint')) || {}
    return checkpoint[state.current.id] ? checkpoint[state.current.id] : { page: 1 }
  }
}

export const mutations = {
  setProjectList(state, payload) {
    state.projects = payload
  },
  createProject(state, project) {
    state.projects.unshift(project)
  },
  updateProject(state, project) {
    const item = state.projects.find(item => item.id === project.id)
    Object.assign(item, project)
  },
  deleteProject(state, projectId) {
    state.projects = state.projects.filter(item => item.id !== projectId)
  },
  updateSelected(state, selected) {
    state.selected = selected
  },
  resetSelected(state) {
    state.selected = []
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setCurrent(state, payload) {
    state.current = payload
  },
  saveSearchOptions(state, options) {
    const checkpoint = JSON.parse(localStorage.getItem('checkpoint')) || {}
    checkpoint[state.current.id] = options
    localStorage.setItem('checkpoint', JSON.stringify(checkpoint))
  }
}

export const actions = {
  getProjectList({ commit }, config) {
    commit('setLoading', true)
    ProjectService.getProjectList()
      .then((response) => {
        commit('setProjectList', response.data)
      })
      .catch((error) => {
        alert('Get project list error')
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  createProject({ commit }, project) {
    ProjectService.createProject(project)
      .then((response) => {
        commit('createProject', response.data)
      })
      .catch((error) => {
        alert('Create project error')
      })
  },
  updateProject({ commit }, data) {
    ProjectService.updateProject(data.projectId, data)
      .then((response) => {
        commit('updateProject', response.data)
      })
      .catch((error) => {
        alert('Update project error')
      })
  },
  deleteProject({ commit, state }, config) {
    for (const project of state.selected) {
      ProjectService.deleteProject(project.id)
        .then((response) => {
          commit('deleteProject', project.id)
        })
        .catch((error) => {
          alert('Delete project error')
        })
    }
    commit('resetSelected')
  },
  setCurrentProject({ commit }, projectId) {
    return ProjectService.fetchProjectById(projectId)
      .then((response) => {
        commit('setCurrent', response.data)
      })
      .catch((error) => {
        alert('Set current project error')
      })
  },
  updateCurrentProject({ commit }, data) {
    ProjectService.updateProject(data.projectId, data)
      .then((response) => {
        commit('setCurrent', response.data)
      })
      .catch((error) => {
        alert('Update current project error')
      })
  }
}
