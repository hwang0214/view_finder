class GuessesController < ApplicationController

  # GET /guesses
  # GET /guesses.json
  def index
    @guesses = Guess.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @guesses }
    end
  end

  # GET /guesses/1
  # GET /guesses/1.json
  def show
    @guess = Guess.find(params[:id])
    @photo_guesses = @guess.photo_guesses_sorted

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @guess }
    end
  end

  # GET /guesses/new
  # GET /guesses/new.json
  def new
    @guess = Guess.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @guess }
    end
  end

  # GET /guesses/1/edit
  def edit
    @guess = Guess.find(params[:id])
  end

  # POST /guesses
  # POST /guesses.json
  def create
    @guess = Guess.new
    @guess.set_attributes(params, current_user)

    if @guess.try(:has_valid_location?)
      @guess.save
      @guess.address_to_coordinates
      redirect_to guess_path(@guess)
    else
      render "error"
    end

  end

  # PUT /guesses/1
  # PUT /guesses/1.json
  def update
    @guess = Guess.find(params[:id])

    respond_to do |format|
      if @guess.update_attributes(params[:guess])
        format.html { redirect_to @guess, notice: 'Guess was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @guess.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guesses/1
  # DELETE /guesses/1.json
  def destroy
    @guess = Guess.find(params[:id])
    @guess.destroy

    respond_to do |format|
      format.html { redirect_to guesses_url }
      format.json { head :no_content }
    end
  end
end
