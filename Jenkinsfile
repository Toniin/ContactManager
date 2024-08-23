pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
        NAME = "toniin/contact-manager-angular"
        VERSION = "${env.BUILD_ID}.0.0"
    }

    agent any

    stages {
        stage('Cloning our Git') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Toniin/ContactManager.git'
            }
        }

        stage('Building our image') {
            steps{
                sh "docker build -t ${NAME} ."
            }
        }

        stage('Deploy our image') {
            steps{
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        sh "docker tag ${NAME} ${NAME}:${VERSION}"

                        sh 'docker push ${NAME}:latest'
                        sh 'docker push ${NAME}:${VERSION}'
                    }
                }
            }
        }

        stage('Cleaning up') {
            steps{
                sh "docker rmi ${NAME}:latest"
                sh "docker rmi ${NAME}:${VERSION}"
            }
        }
    }
}
