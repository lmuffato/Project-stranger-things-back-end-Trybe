1. Criar repositório no Heroku
heroku create

2. Para fazer push no heroku, quando o arquivo já está versionado em outra branch no github
git push heroku <nomeDaBranch>:master

git push heroku lmuffato-sd-010-a-stranger-things-backend:master

3. Habilitando a aplicação para monitoramento pelo dashBoard do site do PM2

3. 1. Configurar o package.json
"scripts": {
    "start": "pm2-runtime start ecosystem.config.yml",
}

3. 2. Configurar o ecosystem.config.yml
apps:
  - name: App
    script: ./index.js

3. 3. Configurar o Procfile
web: pm2-runtime start ecosystem.config.yml

3. 4. Configurar as variáveis de ambiente
Valores das variáveis `PM2_PUBLIC_KEY` e `PM2_SECRET_KEY` obtidas pelo site:
 https://app.pm2.io/bucket/<idDaAplicaCaoNoPm2>
heroku config:set PM2_PUBLIC_KEY="<valor>" --app <nomeDaAplicacao>

heroku config:set PM2_PUBLIC_KEY="e484lrtrttvaa93" --app glacial-journey-95936;
heroku config:set PM2_SECRET_KEY="i8hgyts4u9c5qyi" --app glacial-journey-95936;

3. 5. Verificando as variáveis de ambiente da aplicação
heroku config --app <nomeDaAplicacao>

// Requisito 3 - Verifica a configuração do ecosystem.config.yml
Adicione o arquivo ecosystem.config.yml. O arquivo deverá realizar as seguintes configurações:

1. Ativar o Modo Cluster;
2. Subir duas instâncias do processo;
3. Não assistir à alterações no diretório (modowatch desativado);
4. Reiniciar o processo caso ele consuma mais de 200MB de memória.

importante: O arquivo ecosystem deve ter a extensão yml e não yaml.

4. Criando ambientes diferentes (remote) a partir de uma aplicação existente
heroku create <nomeDaAplicacao> --remote heroku-<nomeDoRemote>

Ambiente upside-down
heroku create lmuffato-bd --remote heroku-upside-down

4. 1. Fazendo push por ambiente
git push heroku-<nomeDoRemote> <nomeDaBranchDoGitHub>-things-backend:master

git push heroku-upside-down lmuffato-sd-010-a-stranger-things-backend:master

5. Renoemando o remote
git remote rename heroku <nomeDoRemote>

git remote rename heroku heroku-origin

git remote rename heroku hawkins

